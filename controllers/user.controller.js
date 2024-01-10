const userModel = require("../models/user.model");
const { string } = require("yup");
const exchangeData = require("../utils/exchangeData")

module.exports = {
    index: async (req, res, next) => {
        let users;
        const { status, keyword } = req.query;
        try {
            users = await userModel.all(status, keyword);
        } catch (e) {
            return next(e); 
        }
        res.render("users/index", { users })
    },
    add: (req, res) => {
        res.render("users/add", { req });
    },
    handleAdd: async (req, res, next) => {
        try {
            const body = await req.validate(req.body, {
                name: string().required("Tên bắt buộc phải nhập"),
                email: string()
                    .required("Email bắt buộc phải nhập")
                    .email("Email không đúng định dạng")
                    .test("check-email", "Email đã tồn tại", async (value) => {
                        const result = await userModel.existEmail(value);
                        return !result.length;
                    }),
                password: string().min(8, 'Mật khẩu phải tối thiếu 8 ký tự').required("Mật khẩu bắt buộc phải nhập"),
                status: string().test(
                    "check-status",
                    "Trạng thái không hợp lệ",
                    (value) => {
                        return +value === 0 || +value === 1;
                    },
                ),
            });
            if (body) {
              //Gọi create
              await userModel.create(body);
              req.flash("msg", "Thêm người dùng thành công");
              return res.redirect("/users");
            }
        } catch (e) {
            return next(e);
        }
        return res.redirect("/users/add");
    },
    edit: async (req, res) => {
        let user;
        const { id } = req.params;
        try {
            if (+id) {
                user = await userModel.getUserById(id);
            }
        } catch (e) {
            return next(e)
        }
        user = exchangeData(user)
        res.render(`users/edit`, { req, user })
    },
    handleEdit: async (req, res, next) => {
        const { id } = req.params;
        try {
            const body = await req.validate(req.body, {
                name: string().required("Tên bắt buộc phải nhập"),
                email: string()
                    .required("Email bắt buộc phải nhập")
                    .email("Email không đúng định dạng")
                    .test("check-email", "Email đã tồn tại", async (value) => {
                        const result = await userModel.existEmail(value, id);
                        return !result.length;
                    }),
                status: string().test(
                    "check-status",
                    "Trạng thái không hợp lệ",
                    (value) => {
                        return +value === 0 || +value === 1;
                    },
                ),
            });
            if (body && +id) {
                await userModel.edit(body, id);
                req.flash("msg", "Sửa người dùng thành công");
                return res.redirect("/users");
            }
        } catch (e) {
            return next(e);
        }
        return res.redirect(`/users/edit/${id}`);
    },
    handleDelete: async (req, res, next) => {
        try {
            const body = await req.validate(req.body, {
                id: string()
                    .required("Id bắt buộc phải nhập")
                    .test("check-id", "Id đã tồn tại", async (value) => {
                        const result = await userModel.getUserById(value);
                        return result.length;
                    }),
            });
            if (body && +body.id) {
                await userModel.delete(body.id);
                req.flash("msg", "Xóa người dùng thành công");
                return res.redirect("/users");
            }
        } catch (e) {
            return next(e);
        }
        return res.redirect(`/users`);
    }
}