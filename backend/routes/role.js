const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.post('/add_role', (req, res) => {
    let role = req.body;
    // Check if the role already exists
    let query = "SELECT role FROM role WHERE role=?";
    console.log(query);
    connection.query(query, [role.role], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                // Role doesn't exist, insert it
                let add_query = "INSERT INTO role(role,role_code,status) VALUES(?,?,?)";
                connection.query(add_query, [role.role, role.role_code, "false"], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Role Successfully Saved" });
                    } else {
                        return res.status(500)._construct({ error: "Internal Server Error" })
                    }
                });
            } else {
                return res.status(400).json({ message: "Role Already Exists" })
            }
        } else {
            return res.status(500).json({ error: "Internal Server Error Select" });
        }
    });
});

module.exports = router;