const sql = require("../utils/db");

module.exports = {
    all: (status, keyword) => {
        let filter = sql`WHERE name IS NOT NULL`;
        if (status === "active" || status === "inactive") {
            filter = sql`${filter} AND status=${status === "active"}`;
        }
        if (keyword) {
            filter = sql`${filter} AND LOWER(email) LIKE ${
                "%" + keyword.toLowerCase() + "%"
            }`;
        }
        return sql`SELECT * FROM users ${filter}`;
    },
    existEmail: (email, id) => {
        let text;
        if (+id) {
            text = sql`AND id != ${+id}`;
        }
        return sql`SELECT id FROM users WHERE email=${email} ${text}`;
    },
    create: ({ name, email, password, status }) => {
        return sql`INSERT INTO users(name, email, password, status, created_at, updated_at) VALUES(${name}, ${email}, ${password}, ${status}, NOW(), NOW())`;
    },
    getUserById: (id) => {
        return sql`SELECT * FROM users AS u WHERE u.id = ${+id}`;
    },
    edit: (user, id) => {
        const columns = ['name', 'email', 'status'];
        return sql`
            UPDATE users
            SET ${sql(user, columns)}
            WHERE id = ${+id}
        `;
    },
    delete: (id) => {
        return sql`DELETE FROM users WHERE id = ${+id}`
    }
}