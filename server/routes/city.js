const express = require("express");
const router = express.Router();
const {
  input,
  getAll,
  stateCreate,
  allStates,
  getState,
  citiesCreate,
  getCity,
  saveLocation,
  DeleteRegion,
  updateRegion,
  findOneRegion,
  findOneState,
  updateState,
  DeleteState,
  allCities,
  updateCity,
  DeleteCity,
  findOneCity,
} = require("../controllers/address");

router.post("/savelocation", saveLocation);
router.post("/inputform", input);
router.get("/getall", getAll);
router.put("/region/:id", updateRegion);
router.get("/region/:id", findOneRegion);
router.delete("/region/:id", DeleteRegion);
router.post("/states", stateCreate);
router.get("/states/:id", findOneState);
router.put("/states/:id", updateState);
router.delete("/states/:id", DeleteState);
router.get("/stateall", allStates);
router.get("/getstate/:regionId", getState);
router.post("/cities", citiesCreate);
router.get("/getcity/:stateId", getCity);
router.get("/cities/:id", findOneCity);
router.get("/citiesall", allCities);
router.put("/cities/:id", updateCity);
router.delete("/cities/:id", DeleteCity);
module.exports = router;
