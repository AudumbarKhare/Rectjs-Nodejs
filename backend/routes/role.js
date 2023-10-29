const express = require('express');
const connection = require('../connection');
const router = express.Router();

//add role
router.post('/add_role', (req, res) => {
    let role = req.body;
    // Check if the role already exists
    let query = "SELECT role FROM role WHERE role=?";
    connection.query(query, [role.role], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                // Role doesn't exist, insert it
                let add_query = "INSERT INTO role(role,role_code,status) VALUES(?,?,?)";
                connection.query(add_query, [role.role, role.role_code, "false"], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Role Successfully Saved" });
                    } else {
                        return res.status(500).json({ error: "Internal Server Error" })
                    }
                });
            } else {
                return res.status(400).json({ message: "Role Already Exists" })
            }
        } else {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    });
});


//get all records
router.get("/get_all_roles", (req, res) => {
    let query = "SELECT * FROM role";
    connection.query(query, (err, results) => {
        if (!err) {
            //console.log(results.length);
            if (results.length > 0) {
                return res.status(200).json({ data: results });
            } else {
                return res.status(400).json({ message: "Records Not Found" });
            }
        } else {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    });
});


//get all records where status is true
router.get("/get_all_roles_by_status", (req, res) => {
    let query = "SELECT * FROM role WHERE status='true'";
    connection.query(query, (err, results) => {
        if (!err) {
            if (results.length > 0) {
                return res.status(200).json({ data: results })
            } else {
                return res.status(400).json({ message: "Records Not Found" })
            }
        } else {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    });
});

//get records by id
router.post("/get_role_by_id", (req, res) => {
    const role = req.body;
    let query = "SELECT * FROM role WHERE id=?";
    connection.query(query, [role.id], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                return res.status(200).json({ data: results });
            } else {
                return res.status(400).json({ message: "Records Not Found" });
            }
        } else {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    });
});

//update records role, role_code by id
router.patch("/update_role", (req, res) => {
    const role = req.body;
    let query = "UPDATE role SET role=?,role_code=?,status=? WHERE id=?";
    connection.query(query, [role.role, role.role_code, role.status, role.id], (err, results) => {
        if (!err) {
            if (results.affectedRows > 0) {
                return res.status(200).json({ message: "Records Updated Successfully" })
            } else {
                return res.status(400).json({ message: "Record Not Found For Update" })
            }
        } else {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    });
});

//update records status by id
router.patch("/update_role_status", (req, res) => {
    const role = req.body;
    let query = "UPDATE role SET status WHERE id=?";
    connection.query(query, [role.status, role.id], (err, results) => {
        if (!err) {
            if (results.affectedRows > 0) {
                return res.status(200).json({ message: "Record Updated Successfully" });
            } else {
                return res.status(400).json({ message: "Records Not Found For Update" });
            }
        } else {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    });
});

//delete records by using id
router.delete("/delete_role", (req, res) => {
    const role = req.body;
    let query = "DELETE FROM role WHERE id=?";
    connection.query(query, [role.id], (err, result) => {
        if (!err) {
            if (result.affectedRows > 0) {
                return res.status(200).status({ message: "Record Delete Successfully" });
            } else {
                return res.status(400).status({ message: "Record Not Found For Delete" })
            }
        } else {
            return res.status(500).status({ error: "Internal Server Error" })
        }
    });
});

module.exports = router;