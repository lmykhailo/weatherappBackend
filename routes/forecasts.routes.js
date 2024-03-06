const Router = require("express");
const router = new Router();
const forecastsController = require("../controllers/forecasts.controller");

router.post("/forecasts", forecastsController.createForecast);
router.get("/forecasts/:id", forecastsController.getOneForecast);
router.get("/forecasts", forecastsController.getForecasts);
router.get("/userforecasts", forecastsController.getUserForecasts);
router.put("/forecasts/:id", forecastsController.updateForecast);
router.delete("/forecasts/:id", forecastsController.deleteForecast);

module.exports = router;
