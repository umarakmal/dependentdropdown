const Role = require("../models/role");
// Create and Save a new Role
exports.create = async (req, res) => {
  try {
    Role.findOne(
      {
        role: req.body.role,
      },
      function (err, role) {
        if (err) {
          alert(err);
          if (role) {
            console.log("Role already exists.");
            return res.status(400).json({
              error: "Role already exists",
            });
          }
        }
      }
    );
    // Create a role
    var role = await new Role({
      role: req.body.role,
      status: req.body.status,
    });
    // Save role in the database
    await role.save(role);
    return res.status(200).json("Role Added Successfully!");
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Role.",
    });
  }
};

// Retrieve all role from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await Role.find();
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while getting all roles.",
    });
  }
};

// Find a single Role with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Role.findById(id);
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving Role with id=" + id });
  }
};

// Update a Role by the id in the request
exports.update = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    const id = req.params.id;
    await Role.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
    return res.status(200).json("Updated Successfully!");
  } catch (err) {
    res.status(500).send({
      message: "Error updating Role with id=" + id,
    });
  }
};

// Delete a Role with the specified id in the request
exports.Delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Role.findByIdAndRemove(id);
    return res.status(200).json("Deleted successfully!");
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Role with id=" + id,
    });
  }
};
// Delete all Roles from the database.
exports.deleteAll = async (req, res) => {
  try {
    await Role.deleteMany({});
    return res.status(200).json("Deleted All Successfully!");
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while removing all Role.",
    });
  }
};
