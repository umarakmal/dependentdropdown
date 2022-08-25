const Country = require("../models/country");
const Stat = require("../models/stat");
const City = require("../models/city");
const Locate = require("../models/locate");

//Create and save the location
exports.saveLocation = async (req, res) => {
  try {
    var locate = await new Locate({
      region: req.body.region,
      state: req.body.state,
      city: req.body.city,
    });
    // Save Location in the database
    await locate.save(locate);
    return res.status(200).json("Successful!");
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating.",
    });
  }
};

// Create a Region
exports.input = async (req, res) => {
  try {
    var country = await new Country({
      region: req.body.region,
    });
    // Save country in the database
    await country.save(country);
    return res.status(200).json("Successful!");
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating.",
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    var response = await Country.find();
    return res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occured while getting all Countries.",
    });
  }
};

// Find a single Region with an id
exports.findOneRegion = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Country.findById(id);
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving Region" });
  }
};

//Update a region
exports.updateRegion = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Data to update can not be empty!",
      });
    }
    const id = req.params.id;
    const data = await Country.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: "Error updating Region",
    });
  }
};

// Delete a Region with the specified id in the request
exports.DeleteRegion = async (req, res) => {
  try {
    const id = req.params.id;
    await Country.findByIdAndRemove(id);
    return res.status(200).json("Successfully deleted!");
  } catch (err) {
    res.status(500).json({
      message: "Could not delete ",
    });
  }
};

//Create States
exports.stateCreate = async (req, res) => {
  try {
    var stat = await new Stat({
      regionId: req.body.regionId,
      state: req.body.state,
    });
    // Save country in the database
    await stat.save(stat);
    return res.status(200).json("Successful!");
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating.",
    });
  }
};

//Get all states
exports.allStates = async (req, res) => {
  try {
    var response = await Stat.find().populate("regionId");
    return res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occured while getting all Countries.",
    });
  }
};

// Find a single State with an id
exports.findOneState = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Stat.findById(id).populate("regionId");
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving State" });
  }
};

//Get state with region id
exports.getState = async (req, res) => {
  try {
    const regionId = req.params.regionId;
    var response = await Stat.find({ regionId }).populate("regionId");
    return res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occured while getting all Countries.",
    });
  }
};

//Update a state
exports.updateState = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Data to update can not be empty!",
      });
    }
    const id = req.params.id;
    const data = await Stat.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    }).populate("regionId");
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: "Error updating Region",
    });
  }
};

// Delete a State with the specified id in the request
exports.DeleteState = async (req, res) => {
  try {
    const id = req.params.id;
    await Stat.findByIdAndRemove(id);
    return res.status(200).json("Successfully deleted!");
  } catch (err) {
    res.status(500).json({
      message: "Could not delete ",
    });
  }
};

//Create Cities
exports.citiesCreate = async (req, res) => {
  try {
    var city = await new City({
      stateId: req.body.stateId,
      city: req.body.city,
    });
    // Save country in the database
    await city.save(city);
    return res.status(200).json("Successful!");
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating.",
    });
  }
};

//Get city according to id
exports.getCity = async (req, res) => {
  try {
    const stateId = req.params.stateId;
    var response = await City.find({ stateId });
    return res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occured while getting all Countries.",
    });
  }
};

//Get all Cities
exports.allCities = async (req, res) => {
  try {
    var response = await City.find().populate("stateId");
    return res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occured while getting all Countries.",
    });
  }
};

// Find a single State with an id
exports.findOneCity = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await City.findById(id).populate("stateId");
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving State" });
  }
};

//Update a City
exports.updateCity = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Data to update can not be empty!",
      });
    }
    const id = req.params.id;
    const data = await City.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    }).populate("stateId");
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: "Error updating Region",
    });
  }
};

// Delete a City with the specified id in the request
exports.DeleteCity = async (req, res) => {
  try {
    const id = req.params.id;
    await City.findByIdAndRemove(id);
    return res.status(200).json("Successfully deleted!");
  } catch (err) {
    res.status(500).json({
      message: "Could not delete ",
    });
  }
};
