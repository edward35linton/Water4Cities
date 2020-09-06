function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/* --------------------------------
 * * Navigation
 * ------------------------------ */

/**
 * Selects region to display
 * @param {String} d Key to use
 */
function select_region(d) {
  var keys = Object.keys(headers.regions);

  if (keys.includes(d)) {
    if (navigation.area !== navigation.previous.area) {
      navigation.previous.region = navigation.region;
      navigation.region = d;
      set_visible_option("region_select", navigation.region);
      update_visualisation();
    }
  }
}
/**
 * Selects area to display
 * @param {String} d Key to use
 */


function select_area(d) {
  var keys = ["all"].concat(_toConsumableArray(Object.keys(headers.areas)));

  if (keys.includes(d)) {
    if (navigation.area !== navigation.previous.area) {
      navigation.previous.area = navigation.area;
      navigation.area = d;
      set_visible_option("area_select", navigation.area);
      update_visualisation();
    }
  }
}
/**
 * Selects year to display
 * @param {String} d Key to use
 */


function select_year(d) {
  var keys = ["all"].concat(_toConsumableArray(Object.keys(headers.years)));

  if (keys.includes(d)) {
    if (navigation.area !== navigation.previous.area) {
      navigation.previous.year = navigation.year;
      navigation.year = d;
      set_visible_option("year_select", navigation.year);
      update_visualisation();
    }
  }
}
/**
 * Selects month to display
 * @param {String} d Key to use
 */


function select_month(d) {
  var keys = ["all"].concat(_toConsumableArray(Object.keys(headers.months)));

  if (keys.includes(d)) {
    if (navigation.area !== navigation.previous.area) {
      navigation.previous.month = navigation.month;
      navigation.month = d;
      set_visible_option("month_select", navigation.month);
      update_visualisation();
    }
  }
}
/**
 * Selects day to display
 * @param {String} d Key to use
 */


function select_day(d) {
  var keys = ["all"].concat(_toConsumableArray(Object.keys(headers.days)));

  if (keys.includes(d)) {
    if (navigation.area !== navigation.previous.area) {
      navigation.previous.day = navigation.day;
      navigation.day = d;
      set_visible_option("day_select", navigation.day);
      update_visualisation();
    }
  }
}

function navigate_from_stack(target) {
  var date = target.split("/");
  var num = date.length;

  switch (num) {
    case 1:
      select_year(date[0]);
      break;

    case 2:
      select_month(date[0]);
      select_year(date[1]);
      break;

    case 3:
      select_day(date[0]);
      select_month(date[1]);
      select_year(date[2]);
      break;

    default:
      break;
  }
}
/* --------------------------------
 * * Data Handlers
 * ------------------------------ */


var base_object = {};
var navigation = {
  region: "all",
  area: "all",
  year: "all",
  month: "all",
  day: "all",
  previous: {
    region: null,
    area: null,
    year: null,
    month: null,
    day: null
  }
};
var data_map = {
  keys: {
    DATE: "date",
    AC_BAC_BMC: ["billed-auth-metered", "Billed: Metered", "#00cec9"],
    AC_BAC_BUC: ["billed-auth-unmetered", "Billed: Unmetered", "#81ecec"],
    AC_UBAC_BMC: ["unbilled-auth-metered", "Unbilled: Metered", "#f3a683"],
    AC_UBAC_BUC: ["unbilled-auth-unmetered", "Unbilled: Unmetered", "#f19066"],
    WL_AL_UC: ["unauth-cons", "Apparent Loss: Unauthorised Consumption", "#ffeaa7"],
    WL_AL_MI: ["meter-innac", "Apparent Loss: Metering Inaccuracies", "#fdcb6e"],
    WL_RL_DM: ["leakage-trans", "Real Loss: Transmission Leakage", "#d63031"],
    WL_RL_ST: ["leakage-tanks", "Real Loss: Storage Leakage", "#ff7675"],
    WL_RL_SC: ["leakage-conn", "Real Loss: Connection Leakage", "#F99BA6"]
  },
  formatted: {}
};
var headers = {
  regions: {},
  areas: {},
  years: {},
  months: {},
  days: {}
};
/**
 * Load data from source file
 * @async
 * @param {String} csv_source Data source file
 * @returns {Boolean} True if data loaded
 */

function load_data(_x) {
  return _load_data.apply(this, arguments);
}
/**
 * Converts loaded data into partition data.
 * @async
 * @returns {Object} Formatted data objects
 */


function _load_data() {
  _load_data = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(csv_source) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return format_raw_data(csv_source);

          case 2:
            loaded_data = _context.sent;
            create_breadcrumbs();
            return _context.abrupt("return", true);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _load_data.apply(this, arguments);
}

function get_partition_data() {
  return _get_partition_data.apply(this, arguments);
}
/**
 * Converts loaded data into stack data
 * @async
 * @returns {Array} Array of formatted data objects
 */


function _get_partition_data() {
  _get_partition_data = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var partition_data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return convert_object_to_partition_data(loaded_data["skiathos"].data);

          case 2:
            partition_data = _context2.sent;
            return _context2.abrupt("return", partition_data);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _get_partition_data.apply(this, arguments);
}

function get_stack_data() {
  return _get_stack_data.apply(this, arguments);
}
/**
 * Handles data regeneration on visualisation update
 */


function _get_stack_data() {
  _get_stack_data = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", get_data__stack());

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _get_stack_data.apply(this, arguments);
}

function update_visualisation() {
  disable_months();
  var partition_interim = get_data__partition();
  var stack_interim = get_data__stack();
  update_selector_visibility();
  var any_data = has_data(partition_interim);
  var data_to_pass = any_data ? convert_object_to_partition_data(partition_interim) : {};
  partition_vis_update(data_to_pass, any_data);
  stack_update(stack_interim);
}
/**
 * Initialises data variables
 * * Will return true to signify completion of inner function calls.
 * @async
 * @returns {Boolean} True when done
 */


function init_data_options() {
  return _init_data_options.apply(this, arguments);
}
/**
 * Loads raw from CSV and formats into hierarchial object
 * @param {String} csv_file CSV File to load
 * @async
 * @returns {Object} Formatted data
 */


function _init_data_options() {
  _init_data_options = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            base_object_reset().then(function (done) {// Optionally do something here...
            });
            generate_keys_formatted().then(function (done) {// Optionally do something here...
            });
            return _context4.abrupt("return", true);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _init_data_options.apply(this, arguments);
}

function format_raw_data(_x2) {
  return _format_raw_data.apply(this, arguments);
}
/**
 * Converts loaded data into a partition-friendly hierarchial format
 * @param {Object} data Data to convert
 * @returns {Object} Converted data
 */


function _format_raw_data() {
  _format_raw_data = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(csv_file) {
    var root, _arr, _i, r, _arr3, _i3, a, _arr4, _i4, y, _arr5, _i5, m, _arr6, _i6, d, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, e, target_root, _arr2, _i2, _r, r_r, _arr7, _i7, _a, a_r, _arr8, _i8, _y, y_r, _arr9, _i9, _m, m_r, _obj3, _key3, _obj2, _key2, _obj, _key, obj, key;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return raw_data_parse(csv_file);

          case 2:
            raw_data = _context5.sent;
            // Populate header object.
            // Headers used to populate selectors and navigation aspects
            // Headers also used to generate object in the next step.
            raw_data.forEach(function (d) {
              var region = d.region;
              var area = d.area;
              var year = d.year;
              var month = d.month;
              var day = d.day;

              if (headers.regions[region] === undefined) {
                headers.regions[region] = 1;
              } else {
                headers.regions[region] = headers.regions[region] + 1;
              }

              if (headers.areas[area] === undefined) {
                headers.areas[area] = 1;
              } else {
                headers.areas[area] = headers.areas[area] + 1;
              }

              if (headers.years[year] === undefined) {
                headers.years[year] = 1;
              } else {
                headers.years[year] = headers.years[year] + 1;
              }

              if (headers.months[month] === undefined) {
                headers.months[month] = 1;
              } else {
                headers.months[month] = headers.months[month] + 1;
              }

              if (headers.days[day] === undefined) {
                headers.days[day] = 1;
              } else {
                headers.days[day] = headers.days[day] + 1;
              }
            }); // Construct a 'skeleton' object by parsing each row of the CSV
            // data and generates the properies of the object.
            // Will create data for each key in each header, even if data missing, in
            // which case an empty data object added.

            root = {};
            _arr = Object.keys(headers.regions);

            for (_i = 0; _i < _arr.length; _i++) {
              r = _arr[_i];
              root[r] = {
                data: {}
              };
              _arr3 = Object.keys(headers.areas);

              for (_i3 = 0; _i3 < _arr3.length; _i3++) {
                a = _arr3[_i3];
                root[r][a] = {
                  data: {}
                };
                _arr4 = Object.keys(headers.years);

                for (_i4 = 0; _i4 < _arr4.length; _i4++) {
                  y = _arr4[_i4];
                  root[r][a][y] = {
                    data: {}
                  };
                  _arr5 = Object.keys(headers.months);

                  for (_i5 = 0; _i5 < _arr5.length; _i5++) {
                    m = _arr5[_i5];
                    root[r][a][y][m] = {
                      data: {}
                    };
                    _arr6 = Object.keys(headers.days);

                    for (_i6 = 0; _i6 < _arr6.length; _i6++) {
                      d = _arr6[_i6];
                      root[r][a][y][m][d] = {
                        data: {}
                      };
                    }
                  }
                }
              }
            } // 3. Populate Leaves


            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context5.prev = 10;

            for (_iterator = raw_data[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              e = _step.value;
              target_root = root["".concat(e.region)]["".concat(e.area)]["".concat(e.year)]["".concat(e.month)]["".concat(e.day)]["data"];
              target_root["range_band"] = "".concat(e.day, "/").concat(e.month, "/").concat(e.year) || 0;
              target_root[data_map.keys.AC_BAC_BMC[0]] = e[data_map.keys.AC_BAC_BMC[0]] || 0;
              target_root[data_map.keys.AC_BAC_BUC[0]] = e[data_map.keys.AC_BAC_BUC[0]] || 0;
              target_root[data_map.keys.AC_UBAC_BMC[0]] = e[data_map.keys.AC_UBAC_BMC[0]] || 0;
              target_root[data_map.keys.AC_UBAC_BUC[0]] = e[data_map.keys.AC_UBAC_BUC[0]] || 0;
              target_root[data_map.keys.WL_AL_UC[0]] = e[data_map.keys.WL_AL_UC[0]] || 0;
              target_root[data_map.keys.WL_AL_MI[0]] = e[data_map.keys.WL_AL_MI[0]] || 0;
              target_root[data_map.keys.WL_RL_DM[0]] = e[data_map.keys.WL_RL_DM[0]] || 0;
              target_root[data_map.keys.WL_RL_ST[0]] = e[data_map.keys.WL_RL_ST[0]] || 0;
              target_root[data_map.keys.WL_RL_SC[0]] = e[data_map.keys.WL_RL_SC[0]] || 0;
            } // 4. Total up each section


            _context5.next = 18;
            break;

          case 14:
            _context5.prev = 14;
            _context5.t0 = _context5["catch"](10);
            _didIteratorError = true;
            _iteratorError = _context5.t0;

          case 18:
            _context5.prev = 18;
            _context5.prev = 19;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 21:
            _context5.prev = 21;

            if (!_didIteratorError) {
              _context5.next = 24;
              break;
            }

            throw _iteratorError;

          case 24:
            return _context5.finish(21);

          case 25:
            return _context5.finish(18);

          case 26:
            _arr2 = Object.keys(headers.regions);

            for (_i2 = 0; _i2 < _arr2.length; _i2++) {
              _r = _arr2[_i2];
              r_r = root[_r];
              _arr7 = Object.keys(headers.areas);

              for (_i7 = 0; _i7 < _arr7.length; _i7++) {
                _a = _arr7[_i7];
                a_r = root[_r][_a];
                _arr8 = Object.keys(headers.years);

                for (_i8 = 0; _i8 < _arr8.length; _i8++) {
                  _y = _arr8[_i8];
                  y_r = root[_r][_a][_y];
                  _arr9 = Object.keys(headers.months);

                  for (_i9 = 0; _i9 < _arr9.length; _i9++) {
                    _m = _arr9[_i9];
                    m_r = root[_r][_a][_y][_m];
                    _obj3 = {};
                    Object.assign(_obj3, base_object);

                    for (_key3 in m_r) {
                      if (_key3 != "data") {
                        add_objects(_obj3, m_r[_key3].data);
                        _obj3["range_band"] = "".concat(_m, "/").concat(_y);
                      }
                    }

                    m_r["data"] = _obj3;
                  }

                  _obj2 = {};
                  Object.assign(_obj2, base_object);

                  for (_key2 in y_r) {
                    if (_key2 != "data") {
                      add_objects(_obj2, y_r[_key2].data);
                      _obj2["range_band"] = "".concat(_y);
                    }
                  }

                  y_r["data"] = _obj2;
                }

                _obj = {};
                Object.assign(_obj, base_object);

                for (_key in a_r) {
                  if (_key != "data") {
                    add_objects(_obj, a_r[_key].data);
                    _obj["range_band"] = "".concat(_a);
                  }
                }

                a_r["data"] = _obj;
              }

              obj = {};
              Object.assign(obj, base_object);

              for (key in r_r) {
                if (key != "data") {
                  add_objects(obj, r_r[key].data);
                  obj["range_band"] = "".concat(_r);
                }
              }

              r_r["data"] = obj;
            }

            return _context5.abrupt("return", root);

          case 29:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[10, 14, 18, 26], [19,, 21, 25]]);
  }));
  return _format_raw_data.apply(this, arguments);
}

function convert_object_to_partition_data(data) {
  var e = data;
  var obj = {
    name: "System Input Volume",
    colour: "#778beb",
    children: [{
      name: "Authorised Consumption",
      colour: "#55efc4",
      children: [{
        name: "Billed Consumption",
        colour: "#11bdb8",
        children: [{
          name: "Metered Consumption",
          value: e[data_map.keys.AC_BAC_BMC[0]],
          colour: data_map.keys.AC_BAC_BMC[2]
        }, {
          name: "Unmetered Consumption",
          value: e[data_map.keys.AC_BAC_BUC[0]],
          colour: data_map.keys.AC_BAC_BUC[2]
        }]
      }, {
        name: "Unbilled Consumption",
        colour: "#e2b572",
        children: [{
          name: "Metered Consumption",
          value: e[data_map.keys.AC_UBAC_BMC[0]],
          colour: data_map.keys.AC_UBAC_BMC[2]
        }, {
          name: "Unmetered Consumption",
          value: e[data_map.keys.AC_UBAC_BUC[0]],
          colour: data_map.keys.AC_UBAC_BUC[2]
        }]
      }]
    }, {
      name: "Water Losses",
      colour: "#ff7675",
      children: [{
        name: "Apparent Losses",
        colour: "#eedbb6",
        children: [{
          name: "Unauthorised Consumption",
          value: e[data_map.keys.WL_AL_UC[0]],
          colour: data_map.keys.WL_AL_UC[2]
        }, {
          name: "Metering Inaccuracies",
          value: e[data_map.keys.WL_AL_MI[0]],
          colour: data_map.keys.WL_AL_MI[2]
        }]
      }, {
        name: "Real Losses",
        colour: "#E88AA5",
        children: [{
          name: "Leakage Transmission and / or Dist. Mains",
          value: e[data_map.keys.WL_RL_DM[0]],
          colour: data_map.keys.WL_RL_DM[2]
        }, {
          name: "Leakage at Utility Storage Tanks",
          value: e[data_map.keys.WL_RL_ST[0]],
          colour: data_map.keys.WL_RL_ST[2]
        }, {
          name: "Leakage at Service Connections",
          value: e[data_map.keys.WL_RL_SC[0]],
          colour: data_map.keys.WL_RL_SC[2]
        }]
      }]
    }]
  };
  return obj;
}
/**
 * Generates specific partition data object based
 * on navigation.
 * @param {Object} data Specific data
 */


function get_data__partition() {
  var data = {};
  Object.assign(data, base_object); // Get the right areas...

  var area_keys = Object.keys(loaded_data["skiathos"]).filter(navigation.area !== "all" ? function (k) {
    return k === navigation.area;
  } : function (k) {
    return k !== "data" && k !== "date";
  }); // Get the right years...

  area_keys.forEach(function (area) {
    if (loaded_data["skiathos"][area]) {
      var year_keys = Object.keys(loaded_data["skiathos"][area]).filter(navigation.year !== "all" ? function (k) {
        return k === navigation.year;
      } : function (k) {
        return k !== "data" && k !== "date";
      }); // Get the right month...

      year_keys.forEach(function (year) {
        if (loaded_data["skiathos"][area][year]) {
          var month_keys = Object.keys(loaded_data["skiathos"][area][year]).filter(navigation.month !== "all" ? function (k) {
            return k === navigation.month;
          } : function (k) {
            return k !== "data" && k !== "date";
          }); // Get the right day...

          month_keys.forEach(function (month) {
            if (loaded_data["skiathos"][area][year][month]) {
              var day_keys = Object.keys(loaded_data["skiathos"][area][year][month]).filter(navigation.day !== "all" ? function (k) {
                return k === navigation.day;
              } : function (k) {
                return k !== "data" && k !== "date";
              }); // Sum requested data!

              day_keys.forEach(function (day) {
                add_objects(data, loaded_data["skiathos"][area][year][month][day].data);
              });
            }
          });
        }
      });
    }
  });
  return data;
}
/**
 * Generates specific stack data object array
 * based on navigation.
 * @param {Object} data Specific data
 */


function get_data__stack() {
  var data = [];
  var area_keys = [];
  var year_keys = [];
  var month_keys = [];
  var day_keys = []; // Get the area key(s)...

  area_keys = Object.keys(loaded_data["skiathos"]).filter(navigation.area !== "all" ? function (k) {
    return k === navigation.area;
  } : function (k) {
    return k !== "data" && k !== "date";
  }); // Get year key(s)
  // Then spread these keys into a set, to get the maximum, but unique
  // keys

  area_keys.forEach(function (area) {
    var _year_keys;

    (_year_keys = year_keys).push.apply(_year_keys, _toConsumableArray(Object.keys(loaded_data["skiathos"][area]).filter(navigation.year !== "all" ? function (k) {
      return k === navigation.year;
    } : function (k) {
      return k !== "data" && k !== "date";
    })));
  });
  year_keys = _toConsumableArray(new Set(year_keys));

  if (navigation.year !== "all") {
    // Get month key(s)
    area_keys.forEach(function (area) {
      year_keys.forEach(function (year) {
        var _month_keys;

        (_month_keys = month_keys).push.apply(_month_keys, _toConsumableArray(Object.keys(loaded_data["skiathos"][area][year]).filter(navigation.month !== "all" ? function (k) {
          return k === navigation.month;
        } : function (k) {
          return k !== "data" && k !== "date";
        })));
      });
    });
    month_keys = _toConsumableArray(new Set(month_keys));
  } // Now we can get data...
  // Case 1: All years --> No Months


  if (navigation.year === "all") {
    year_keys.forEach(function (year) {
      var d = {};
      Object.assign(d, base_object);
      area_keys.forEach(function (area) {
        if (loaded_data["skiathos"][area][year].data) {
          add_objects(d, loaded_data["skiathos"][area][year].data);
        }
      });
      d.range_band = "".concat(year);
      data.push(d);
    });
    return data;
  } // Case 2: * year, all month -->


  if (navigation.month === "all") {
    month_keys.forEach(function (month) {
      year_keys.forEach(function (year) {
        var d = {};
        Object.assign(d, base_object);
        area_keys.forEach(function (area) {
          if (loaded_data["skiathos"][area][year][month].data) {
            add_objects(d, loaded_data["skiathos"][area][year][month].data);
          }
        });
        d.range_band = "".concat(month, "/").concat(year);
        data.push(d);
      });
    });
    return data;
  } // Case 3 (Final): * year, * month, all days -->


  if (navigation.month !== "all") {
    // Get day key(s)
    area_keys.forEach(function (area) {
      year_keys.forEach(function (year) {
        month_keys.forEach(function (month) {
          var _day_keys;

          (_day_keys = day_keys).push.apply(_day_keys, _toConsumableArray(Object.keys(loaded_data["skiathos"][area][year][month]).filter(function (k) {
            return k !== "data" && k !== "date";
          })));
        });
      });
    });
    day_keys = _toConsumableArray(new Set(day_keys));
    day_keys.forEach(function (day) {
      month_keys.forEach(function (month) {
        year_keys.forEach(function (year) {
          var d = {};
          Object.assign(d, base_object);
          area_keys.forEach(function (area) {
            if (loaded_data["skiathos"][area][year][month][day].data) {
              var obj = loaded_data["skiathos"][area][year][month][day].data;
              add_objects(d, obj);
            }
          });
          d.range_band = "".concat(day, "/").concat(month, "/").concat(year);
          if (d.total) data.push(d); // Only push if we have data!
        });
      });
    });
    return data;
  } // This is a unhandled case, ie. data unspecified, so will return empty.


  return data;
}
/* --------------------------------
 * * Data Handlers: Utility
 * ------------------------------ */

/**
 * Loads a raw CSV file into memory
 * @param {String} csv_file CSV File to load
 * @returns {Array<Object>} Loaded raw data.
 */


function raw_data_parse(_x3) {
  return _raw_data_parse.apply(this, arguments);
}
/**
 * Checks if an object has data (non-zero values)
 * @param {Object} data Data object to check
 * @returns {Boolean} True if object has data, else false.
 */


function _raw_data_parse() {
  _raw_data_parse = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(csv_file) {
    var data;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            data = null; // Get Data From CSV.

            _context6.next = 3;
            return d3.csv(csv_file).then(function (d) {
              data = d;
            });

          case 3:
            return _context6.abrupt("return", data);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _raw_data_parse.apply(this, arguments);
}

function has_data(data) {
  var keys = Object.keys(data).filter(function (k) {
    return k !== "range_band";
  });
  var sum = 0;

  for (var key in keys) {
    sum += +data[keys[key]];
  }

  return sum ? true : false;
}
/**
 * Adds two data object values together.
 * @param {Object} a Base object to add values to
 * @param {Object} b Object to add values from
 */


function add_objects(a, b) {
  var a_keys = Object.keys(a);

  for (var i = 0; i < a_keys.length; ++i) {
    a[a_keys[i]] += +b[a_keys[i]] || 0;
  }
}
/**
 * Regenerates the base object and sets values to 0.
 * @async
 */


function base_object_reset() {
  return _base_object_reset.apply(this, arguments);
}
/**
 * Generates formatted keys to use for display
 * @async
 */


function _base_object_reset() {
  _base_object_reset = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7() {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            base_object["range_band"] = 0;
            base_object[data_map.keys.AC_BAC_BMC[0]] = 0;
            base_object[data_map.keys.AC_BAC_BUC[0]] = 0;
            base_object[data_map.keys.AC_UBAC_BMC[0]] = 0;
            base_object[data_map.keys.AC_UBAC_BUC[0]] = 0;
            base_object[data_map.keys.WL_AL_UC[0]] = 0;
            base_object[data_map.keys.WL_AL_MI[0]] = 0;
            base_object[data_map.keys.WL_RL_DM[0]] = 0;
            base_object[data_map.keys.WL_RL_ST[0]] = 0;
            base_object[data_map.keys.WL_RL_SC[0]] = 0;
            return _context7.abrupt("return", true);

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _base_object_reset.apply(this, arguments);
}

function generate_keys_formatted() {
  return _generate_keys_formatted.apply(this, arguments);
}
/* --------------------------------
 * * GUI (General)
 * ------------------------------ */


function _generate_keys_formatted() {
  _generate_keys_formatted = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8() {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            Object.keys(data_map.keys).filter(function (d) {
              return d !== "DATE";
            }).forEach(function (k) {
              return data_map.formatted[data_map.keys[k][0]] = data_map.keys[k][1];
            });
            return _context8.abrupt("return", true);

          case 2:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _generate_keys_formatted.apply(this, arguments);
}

var selectors = {
  r: document.getElementById("region_select"),
  a: document.getElementById("area_select"),
  y: document.getElementById("year_select"),
  m: document.getElementById("month_select"),
  d: document.getElementById("day_select")
};
var lock_switches = document.querySelectorAll(".toggle-switch.lock");
var lock = false;
/**
 * Initializes all GUI element.
 */

function init_gui_elements() {
  init_lock_toggle();
}
/**
 * Initializes GUI toggle elements
 */


function init_lock_toggle() {
  // Lock Toggle (TOP BAR)
  for (var i = 0; i < lock_switches.length; ++i) {
    lock_switches[i].addEventListener("click", function (e) {
      if (this.classList.contains("active")) {
        this.classList.remove("active");
        this.querySelector("input[type=checkbox]").checked = false;
        lock = false;
        document.getElementById("unlocked").classList.add("lock_active");
        document.getElementById("locked").classList.remove("lock_active");
      } else {
        this.classList.add("active");
        this.querySelector("input[type=checkbox]").checked = true;
        lock = true;
        document.getElementById("unlocked").classList.remove("lock_active");
        document.getElementById("locked").classList.add("lock_active");
      }
    });
  }
}
/**
 * Returns the colours stored in the data map array.
 * @returns {Array} Colours as hexidecimal strings
 */


function get_colours_from_csv_keys() {
  var colours = [];
  Object.keys(data_map.keys).filter(function (d) {
    return d !== "DATE";
  }).forEach(function (k, i) {
    return colours[i] = data_map.keys[k][2];
  });
  return colours;
}
/* Selector Functions -----------
 * ------------------------------ */

/**
 * Creates the breadcrumb trail of selectors
 */


function create_breadcrumbs() {
  append_options(Object.keys(headers.regions), selectors.r);
  selectors.r.addEventListener("change", function (e) {
    select_region(selectors.r.options[selectors.r.selectedIndex].text.toLowerCase());
  });
  append_options(["ALL"].concat(_toConsumableArray(Object.keys(headers.areas))), selectors.a);
  selectors.a.addEventListener("change", function (e) {
    select_area(selectors.a.options[selectors.a.selectedIndex].text.toLowerCase());
  });
  append_options(["ALL"].concat(_toConsumableArray(Object.keys(headers.years))), selectors.y);
  selectors.y.addEventListener("change", function (e) {
    select_year(selectors.y.options[selectors.y.selectedIndex].text.toLowerCase());
  });
  disable_months();
}
/**
 * Adds the passed values to the specified sleect element as
 * options.
 * @param {Array<String>} these
 * @param {HTMLSelectElement} to_this
 */


function append_options(these, to_this) {
  for (var i = 0; i < these.length; i++) {
    var opt = these[i].toUpperCase();
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;

    if (opt === "ALL") {
      el.selected = true;
    } else if (i == 0) {
      el.selected = true;
    }

    to_this.appendChild(el);
  }
}
/**
 * Disables the day selector
 */


function disable_days() {
  selectors.d.options.length = 0;
  var d = document.querySelector(".day_select");
  d.classList.add("hidden");
}
/**
 * Disable the month selector
 */


function disable_months() {
  disable_days();
  selectors.m.options.length = 0;
  var m = document.querySelector(".month_select");
  m.classList.add("hidden");
}
/**
 * Enables the day selector
 */


function enable_days() {
  if (selectors.d.options.length === 0) {
    append_options(["ALL"].concat(_toConsumableArray(Object.keys(headers.days))), selectors.d);
    selectors.d.addEventListener("change", function (e) {
      select_day(selectors.d.options[selectors.d.selectedIndex].text.toLowerCase());
    });
    set_visible_option("day_select", navigation.day);
    enable_months();
  }

  document.querySelector(".day_select").classList.remove("hidden");
}
/**
 * Enables the month selector
 */


function enable_months() {
  if (selectors.m.options.length === 0) {
    append_options(["ALL"].concat(_toConsumableArray(Object.keys(headers.months))), selectors.m);
    selectors.m.addEventListener("change", function (e) {
      select_month(selectors.m.options[selectors.m.selectedIndex].text.toLowerCase());
    });
    set_visible_option("month_select", navigation.month);
  }

  document.querySelector(".month_select").classList.remove("hidden");
}
/**
 * Updates, based on navigation, th
 * visibility of the selectors
 */


function update_selector_visibility() {
  if (navigation.area === "all") {
    if (navigation.year !== "all") {
      enable_months();

      if (navigation.month === "all") {
        disable_days();
      } else {
        enable_days();
      }
    }
  } else {
    if (navigation.year === "all") {
      disable_months();
    } else {
      enable_months();

      if (navigation.month === "all") {} else {
        enable_days();
      }
    }
  }
}
/**
 * Sets the selected item of a selector, for when selecting options
 * externally from the selectors i.e. Map click
 * @param {String} el_id Element to change
 * @param {String} new_value Value to display
 */


function set_visible_option(el_id, new_value) {
  var element = document.getElementById(el_id);
  var options = element.options;

  for (var opt, j = 0; opt = options[j]; j++) {
    if (opt.text.toLowerCase() == new_value.toLowerCase()) {
      element.selectedIndex = j;
      break;
    }
  }
}
/* --------------------------------
 * * Stack
 * ------------------------------ */


var stack_config = {
  svg: d3.select("#stack svg"),
  margin: {
    top: 10,
    right: 30,
    bottom: 40,
    left: 40
  },
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  colours: d3.scaleOrdinal(get_colours_from_csv_keys()),
  display: document.getElementById("stack_display"),
  default_string: "<span class='name'>Water data by date range (m\xB3)</span>",
  legend: null,
  cover: document.querySelector(".stack_cover")
};
/**
 * Master function ------------------------------
 * Handles execution of stack chart functions.
 * @async
 * @param {Array<Object>} in_data Incoming raw data
 */

function generate_stack_chart(_x4) {
  return _generate_stack_chart.apply(this, arguments);
}
/**
 * Sets the stack config values.
 * Sets width, height based on margins
 * Sets x & y scales
 */


function _generate_stack_chart() {
  _generate_stack_chart = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(in_data) {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            set_stack_config();
            stack_chart(in_data);

          case 2:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _generate_stack_chart.apply(this, arguments);
}

function set_stack_config() {
  var s = stack_config;
  var m = s.margin;
  var svg = s.svg;
  s.width = +svg.attr("width") - m.left - m.right;
  s.height = +svg.attr("height") - m.top - m.bottom;
  s.x = d3.scaleBand().range([0, s.width]);
  s.y = d3.scaleLinear().range([s.height, 100]);
  s.display.innerHTML = s.default_string;
}
/**
 * Handles creation order of specific stack elements.
 * @param {Array<Object>} in_data Raw data input
 */


function stack_chart(in_data) {
  var data = set_stack_data(in_data);
  render_stack_chart(data);
  create_stack_legend();
}
/**
 * Maps the data to a node.
 * Also maps the domains of the x, y and colour scales.
 * @param {Array<Object>} in_data Raw data
 * @returns {Object} Mapped data
 */


function set_stack_data(in_data) {
  var s = stack_config;
  var data = in_data;
  s.colours.domain(d3.keys(data[0]).filter(function (key) {
    return key !== "range_band";
  }));
  data.forEach(function (d) {
    var y0 = 0;
    d.nodes = s.colours.domain().map(function (name) {
      return {
        name: name,
        value: +d[name],
        y0: y0,
        y1: y0 += +d[name]
      };
    });
    d.total = d.nodes[d.nodes.length - 1].y1;
  });
  s.x.domain(data.map(function (d) {
    return d.range_band;
  }));
  s.y.domain([0, d3.max(data, function (d) {
    return d.total;
  })]);
  return data;
}
/**
 * Renders the stack chart bar and
 * axis elements.
 * @param {Array<Object>} in_data Mapped input data
 */


function render_stack_chart(in_data) {
  var s = stack_config;
  var data = in_data;
  var stack_root_svg = d3.select("#stack svg").append("g").attr("transform", "translate(".concat(s.margin.left, ", ").concat(s.margin.top, ")")); // Set up SVG

  var state = stack_root_svg.selectAll(".range_band").data(data).enter().append("g").attr("class", "g").attr("data", function (d) {
    return d.range_band;
  }).attr("transform", function (d) {
    return "translate(".concat(s.x(d.range_band), " ,0)");
  }); // Add bars

  state.selectAll("rect").data(function (d) {
    return d.nodes;
  }).enter().append("rect").attr("width", s.x.bandwidth()).attr("y", function (d) {
    return s.y(d.y1);
  }).attr("height", function (d) {
    return s.y(d.y0) - s.y(d.y1);
  }).style("fill", function (d) {
    return s.colours(d.name);
  }).on("mouseover", function (d) {
    return stack_bars_MI(d);
  }).on("mouseout", function (d) {
    return stack_bars_MO(d);
  }).on("click", function (d) {
    return stack_bars_CLICK(d3.event.target.parentNode);
  }); // Add X-axis

  stack_root_svg.append("g").attr("class", "x_axis").attr("transform", "translate(0, ".concat(s.height, ")")).call(d3.axisBottom(s.x)).selectAll("text").attr("transform", "rotate(25)").style("text-anchor", "start"); // Add Y-axis

  stack_root_svg.append("g").attr("class", "y_axis").call(d3.axisLeft(s.y).ticks(10)).selectAll("text").attr("dy", ".45em").style("text-anchor", "end");
}
/**
 * Update stack chart to view new data.
 * @param {Array<Object>} new_data Data to update to
 */


function stack_update(new_data) {
  var s = stack_config;

  if (new_data.length === 0) {//s.cover.classList.remove("hidden");
  } else {
    s.cover.classList.add("hidden");
    var data = set_stack_data(new_data);
    var new_svg = s.svg.selectAll("g").data(data);
    s.svg.selectAll("*").remove();
    var stack_root_svg = d3.select("#stack svg").append("g").attr("transform", "translate(".concat(s.margin.left, ", ").concat(s.margin.top, ")")); // Set up SVG

    var state = stack_root_svg.selectAll(".range_band").data(data).enter().append("g").attr("class", "g").attr("data", function (d) {
      return d.range_band;
    }).attr("transform", function (d) {
      return "translate(".concat(s.x(d.range_band), " ,0)");
    }); // Add bars

    state.selectAll("rect").data(function (d) {
      return d.nodes;
    }).enter().append("rect").attr("width", s.x.bandwidth()).attr("y", function (d) {
      return s.y(d.y1);
    }).attr("height", function (d) {
      return s.y(d.y0) - s.y(d.y1);
    }).style("fill", function (d) {
      return s.colours(d.name);
    }).on("mouseover", function (d) {
      return stack_bars_MI(d);
    }).on("mouseout", function (d) {
      return stack_bars_MO(d);
    }).on("click", function (d) {
      return stack_bars_CLICK(d3.event.target.parentNode);
    }); // Add X-axis

    stack_root_svg.append("g").attr("class", "x_axis").attr("transform", "translate(0, ".concat(s.height, ")")).call(d3.axisBottom(s.x)).selectAll("text").attr("transform", "rotate(25)").style("text-anchor", "start"); // Add Y-axis

    stack_root_svg.append("g").attr("class", "y_axis").call(d3.axisLeft(s.y).ticks(10)).selectAll("text").attr("dy", ".45em").style("text-anchor", "end");
    create_stack_legend();
  }
}
/**
 * Creates the stack chart legend
 * (Generated hidden, i.e. opacity 0)
 */


function create_stack_legend() {
  var s = stack_config;
  s.legend = d3.select("#stack svg").selectAll(".legend").data(s.colours.domain().slice()).enter().append("g").attr("class", "legend").style("opacity", 0).attr("transform", function (d, i) {
    return "translate(0, ".concat(i * 15, ")");
  });
  s.legend.append("rect").attr("x", s.width + s.margin.right).attr("width", 12).attr("height", 12).style("fill", s.colours);
  s.legend.append("text").attr("class", "stack_legend_text").attr("x", s.width + s.margin.right - 2).attr("y", 5).attr("dy", ".35em").style("text-anchor", "end").text(function (d) {
    return data_map.formatted[d];
  });
}
/* Event Handlers ---------------- */

/**
 * Mouseover (mouse in) handler for stack bars
 * Uprange_bands data display and shows legend
 * @param {Object} d Bound data
 */


function stack_bars_MI(d) {
  var s = stack_config;
  var total = d3.select(d3.event.target.parentNode).datum().total;
  var percent = d.value / total * 100;
  s.display.innerHTML = "\n        <span class=\"name\">".concat(data_map.formatted[d.name], ":</span>\n        <br/>\n        <span class=\"value\">").concat(d.value, "</span>/ ").concat(total, " m\xB3 ( ").concat(percent.toFixed(2), " %)\n    ");
  s.legend.style("opacity", 1);
}
/**
 * Mouseout handler for stack bars
 * Clears data display and hides legend
 * @param {Object} d Bound data
 */


function stack_bars_MO(d) {
  var s = stack_config;
  s.display.innerHTML = s.default_string;
  s.legend.style("opacity", 0);
}
/**
 * Click handler for stack bars
 * @param {Object} d Bound data
 */


function stack_bars_CLICK(target) {
  if (!lock) {
    var p = target;
    var data = p.getAttribute("data");
    navigate_from_stack(data);
  }
}
/* --------------------------------
 * * Lines
 * ------------------------------ */


var line_config = {
  svg: d3.select("#line svg"),
  margin: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 40
  },
  width: 0,
  height: 0,
  colour: "#34C4FB",
  date_format: "2013/01/01",
  display_string: "Groundwater level (m)"
};

function set_line_dimensions() {
  var svg = line_config.svg;
  var m = line_config.margin;
  line_config.width = +svg.attr("width") - m.left - m.right;
  line_config.height = +svg.attr("height") - m.top - m.bottom;
}

function generate_line_graph(source_file) {
  set_line_dimensions();
  var l = line_config;
  var margin = l.margin,
      width = l.width,
      height = l.height,
      date_format = l.date_format;
  var line_svg = l.svg;
  d3.csv(source_file).then(function (data) {
    var line_data = data.map(function (d) {
      return {
        date: new Date(d.Date),
        value: +d.Value
      };
    }).filter(function (d) {
      return d.date > new Date(date_format);
    });
    var x = d3.scaleTime().rangeRound([0, width]).domain(d3.extent(line_data, function (d) {
      return d.date;
    }));
    var y = d3.scaleLinear().rangeRound([height, 0]).domain(d3.extent(line_data, function (d) {
      return d.value;
    }));
    var g1 = line_svg.append("g").attr("transform", "translate(".concat(margin.left, ", ").concat(margin.top, ")"));
    var line = d3.line().x(function (d) {
      return x(d.date);
    }).y(function (d) {
      return y(d.value);
    });
    line_svg.data([line_data]).enter().append("g");
    var g = line_svg.selectAll("g");
    g.append("path").data([line_data]).attr("class", "data").attr("fill", "none").attr("stroke", l.colour);
    g.append("g").attr("class", "axis x").attr("transform", "translate(0, ".concat(height - margin.bottom + 15, ")")).call(d3.axisBottom(x).ticks(5)).select(".domain").remove();
    g.append("g").attr("class", "axis y").call(d3.axisLeft(y)).append("text").attr("fill", "#000").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", "0.71em").attr("text-anchor", "end").text(l.display_string);
    g.append("path").attr("class", "data");
    g.select("path.data").datum(line_data).attr("d", line);
  });
}
/* --------------------------------
 * * Partition
 * ------------------------------ */


var partition_config = {
  root: 0,
  svg: d3.select("#partition svg.main"),
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  rw: document.getElementById("rw"),
  nrw: document.getElementById("nrw"),
  cover: document.querySelector(".partition_cover"),
  rev_width: 125,
  rev_height: 0
};
/**
 * Master function ------------------------------
 * Handles execution of partition chart functions.
 * @async
 * @param {Object} in_data Data to load
 */

function generate_partition_chart(_x5) {
  return _generate_partition_chart.apply(this, arguments);
}
/**
 * Sets the partition config values.
 * Sets width, height based on margins
 * Sets x & y scales
 */


function _generate_partition_chart() {
  _generate_partition_chart = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(in_data) {
    var p;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            p = partition_config;
            set_partition_config();
            partition_vis_set_data(in_data);
            render_partition_chart();

          case 4:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _generate_partition_chart.apply(this, arguments);
}

function set_partition_config() {
  var p = partition_config;
  var m = p.margin;
  var svg = p.svg;
  p.width = +svg.attr("width") - m.left - m.right;
  p.height = +svg.attr("height") - m.top - m.bottom;
  p.rev_height = p.height - 2;
  p.x = d3.scaleLinear().range([0, p.width]);
  p.y = d3.scaleLinear().range([0, p.height]);
}
/**
 * Converts the input data into a D3 format.
 * @param {Object} in_data Hierarchial data
 */


function partition_vis_set_data(_x6) {
  return _partition_vis_set_data.apply(this, arguments);
}
/**
 * Renders the partition chart
 */


function _partition_vis_set_data() {
  _partition_vis_set_data = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11(in_data) {
    var p;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            p = partition_config;
            p.root = d3.hierarchy(in_data);
            p.root.sum(function (d) {
              return d.value;
            });
            partition = d3.partition().size([p.height, p.width]).padding(1).round(true);
            partition(p.root);

          case 5:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return _partition_vis_set_data.apply(this, arguments);
}

function render_partition_chart() {
  var p = partition_config;
  revenue_water_render(p.root);
  var partition_svg = p.svg.selectAll("g").data(p.root.descendants()).enter().append("g").attr("class", "node").attr("transform", function (d) {
    return "translate(".concat(d.y0, ", ").concat(d.x0, ")");
  });
  partition_svg.append("rect").attr("width", function (d) {
    return d.y1 - d.y0;
  }).attr("height", function (d) {
    return d.x1 - d.x0;
  }).style("fill", function (d) {
    return d.data.colour;
  }).style("opacity", 0.6);
  partition_svg.append("text").attr("text-anchor", "start").attr("x", 5).attr("dy", 15).attr("class", "node-label-name").text(function (d) {
    return d.data.name;
  });
  partition_svg.append("text").attr("text-anchor", "start").attr("x", 5).attr("dy", 30).attr("class", "node-label-value").text(function (d) {
    return d.value + " m\xB3";
  });
}
/**
 * Handles updating of partition chart
 * @param {Object} data Data to use
 */


function partition_vis_update(data) {
  var has_data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var p = partition_config;

  if (has_data) {
    p.cover.classList.add("hidden");
    partition_vis_set_data(data);
    revenue_water_update(p.root);
    var new_svg = p.svg.selectAll("g").data(p.root.descendants());
    new_svg.transition().duration(500).attr("transform", function (d) {
      return "translate(".concat(d.y0, ", ").concat(d.x0, ")");
    });
    new_svg.select("rect").attr("width", function (d) {
      return d.y1 - d.y0;
    }).transition().duration(500).attr("height", function (d) {
      return d.x1 - d.x0;
    });
    new_svg.select(".node-label-name").text(function (d) {
      return d.data.name;
    });
    new_svg.select(".node-label-value").text(function (d) {
      return "".concat(d.value, " m\xB3");
    });
  } else {
    p.cover.classList.remove("hidden");
  }
}
/**
 * Generates data for the revenue water portion of the partition
 * @param {Object} data Raw data
 * @returns {Object} Formatted data
 */


function generate_revenue_water_data(data) {
  var p = partition_config;
  var rw_value = data.descendants()[3].value;
  var revenues = {
    total: null,
    ratio: null,
    rw: {
      name: "Revenue Water",
      value: rw_value,
      html: null,
      height: null
    },
    nrw: {
      name: "Non Revenue Water",
      value: data.value - rw_value,
      html: null,
      height: null
    }
  };
  var rrw = revenues.rw;
  var rnrw = revenues.nrw;
  revenues.total = rrw.value + rnrw.value;
  rrw.height = p.rev_height * (rrw.value / revenues.total) - 1;
  rnrw.height = p.rev_height * (rnrw.value / revenues.total);
  rrw.html = "".concat(rrw.name, "<br/>").concat(rrw.value, " m\xB3");
  rnrw.html = "".concat(rnrw.name, "<br/>").concat(rnrw.value, " m\xB3");
  return revenues;
}
/**
 * Renders the revenue water portion of the partition
 * @param {Object} data Formatted data to render
 */


function revenue_water_render(data) {
  var p = partition_config;
  var rev = generate_revenue_water_data(data);
  p.rw.innerHTML = rev.rw.html;
  p.nrw.innerHTML = rev.nrw.html;
  p.rw.style.height = rev.rw.height + "px";
  p.nrw.style.height = rev.nrw.height + "px";
  p.rw.style.backgroundColor = "#55efc4";
  p.nrw.style.backgroundColor = "#ff7675";
}
/**
 * Updates the revenue water portion of the partition
 * @param {Object} data Raw data to use
 */


function revenue_water_update(data) {
  var p = partition_config;
  var rev = generate_revenue_water_data(data);
  p.rw.innerHTML = rev.rw.html;
  p.nrw.innerHTML = rev.nrw.html;
  p.rw.style.height = rev.rw.height + "px";
  p.nrw.style.height = rev.nrw.height + "px";
}
/* --------------------------------
 * * Map
 * ------------------------------ */


var map_config = {
  svg: null,
  projection: null,
  path: null,
  width: 625,
  height: 425,
  ocean: "#c9e8fd",
  // Ocean colour
  map_layers: {
    base: d3.json("data/maps/base.geojson"),
    name: d3.json("data/maps/places.geojson")
  },
  map_names: {
    en: "en_name",
    gr: "name"
  },
  map_labels: null,
  place_labels: null,
  map_label_text: null,
  lang_switch: document.querySelector(".toggle-switch.lang"),
  lang_left: document.getElementById("sel_left"),
  lang_right: document.getElementById("sel_right"),
  map_back_button: document.querySelector(".back")
};
/**
 * Master function ------------------------------
 * Handles execution of map functions.
 * @async
 */

function generate_map() {
  return _generate_map.apply(this, arguments);
}
/**
 * Initializes interdependant map configuration
 * values.
 */


function _generate_map() {
  _generate_map = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee12() {
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            init_map_gui();
            init_map_config();
            render_map();

          case 3:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return _generate_map.apply(this, arguments);
}

function init_map_config() {
  var c = map_config;
  c.map_label_text = c.map_names.gr;
}
/**
 * Initializes the map GUI elements
 */


function init_map_gui() {
  var c = map_config; // Back Button ("Area Select --> all")

  c.map_back_button.addEventListener("click", function (e) {
    if (!lock) {
      e.preventDefault();
      select_area("all");
    }
  }); // Language Toggle (English <-> Greek)

  c.lang_switch.addEventListener("click", function (e) {
    if (!lock) {
      if (this.classList.contains("active")) {
        this.classList.remove("active");
        this.querySelector("input[type=checkbox]").checked = false;
        c.map_label_text = c.map_names.gr;
        c.lang_left.classList.add("sel_active");
        c.lang_right.classList.remove("sel_active");
        c.map_labels.text(function (d) {
          return d.properties[c.map_label_text];
        });
        c.place_labels.text(function (d) {
          return d.properties[c.map_label_text];
        });
      } else {
        this.classList.add("active");
        this.querySelector("input[type=checkbox]").checked = true;
        c.map_label_text = c.map_names.en;
        c.lang_left.classList.remove("sel_active");
        c.lang_right.classList.add("sel_active");
        c.map_labels.text(function (d) {
          return d.properties[c.map_label_text];
        });
        c.place_labels.text(function (d) {
          return d.properties[c.map_label_text];
        });
      }
    }
  });
}
/**
 * Renders the map layers
 */


function render_map() {
  var c = map_config;
  Promise.all(Object.values(c.map_layers)).then(function (values) {
    var w = c.width;
    var h = c.height;
    var map = values[0].features;
    c.projection = d3.geoEqualEarth().fitSize([w - 75, h - 50], map[6]).center([0, 0.004]);
    c.path = d3.geoPath().projection(c.projection);
    c.svg = d3.select("div#map").append("svg").style("background-color", "#c9e8fd").attr("width", w).attr("height", h);
    c.svg.selectAll("path").data(map).enter().append("path").attr("class", "map_area").attr("id", function (d) {
      return d.properties.en_name.toLowerCase();
    }).attr("d", c.path);
    c.map_labels = c.svg.selectAll(".map_label").data(map).enter().append("text").attr("class", "map_label").attr("transform", function (d) {
      return "translate(".concat(c.path.centroid(d)[0] - 20, ", \n                                ").concat(c.path.centroid(d)[1], "), scale(1)");
    }).text(function (d) {
      return d.properties[c.map_label_text];
    });
    var places = values[1].features;
    c.svg.selectAll("circle").data(places).enter().append("circle").attr("class", "place").attr("id", function (d) {
      return d.properties.en_name.toLowerCase();
    }).attr("cx", function (d) {
      return c.projection(d.geometry.coordinates)[0];
    }).attr("cy", function (d) {
      return c.projection(d.geometry.coordinates)[1];
    }).attr("r", "5px").on("click", function (d) {
      if (!lock) {
        select_area(d.properties.en_name.toLowerCase());
      }
    });
    c.place_labels = c.svg.selectAll(".place_label").data(places).enter().append("text").attr("class", "place_label").attr("transform", function (d) {
      return "translate(".concat(c.path.centroid(d)[0] + 7, ",\n                                ").concat(c.path.centroid(d)[1] + 2, "), scale(1)");
    }).text(function (d) {
      return d.properties[c.map_label_text];
    });
  });
}
/* --------------------------------
 * * Entry
 * ------------------------------ */


var csv_data_file = "./data/skiathos.csv";
/* ↓↓↓↓↓↓↓↓↓↓ STARTS THE WHOLE VISUALISATION! ↓↓↓↓↓↓↓↓↓↓ */

skiathos_visualisation(csv_data_file);
/* ↑↑↑↑↑↑↑↑↑↑ STARTS THE WHOLE VISUALISATION! ↑↑↑↑↑↑↑↑↑↑ */

/**
 * Initialises the entire visualisation
 * @param {String} csv_source File to load
 */

function skiathos_visualisation(_x7) {
  return _skiathos_visualisation.apply(this, arguments);
}

function _skiathos_visualisation() {
  _skiathos_visualisation = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee13(csv_source) {
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return init_data_options().then(function (done) {
              init_gui_elements();
              generate_map();
              generate_line_graph("./data/lines/features_85064.csv");
              load_data(csv_source).then(function (success) {
                if (success) {
                  get_partition_data().then(function (data) {
                    generate_partition_chart(data);
                  });
                  get_stack_data().then(function (data) {
                    generate_stack_chart(data);
                  });
                } else {}
              });
              document.getElementById("loading").classList.add("hide");
            });

          case 2:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));
  return _skiathos_visualisation.apply(this, arguments);
}