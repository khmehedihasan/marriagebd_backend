const Package = require("../Models/Package");

exports.updatePackage = async (req, res, next) => {
  try {
    const data = await Package.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      price: req.body.price,
      days: req.body.days,
    });

    if (data.id != undefined) {
      res.send({ status: true, message: "Request send seccessfully." });
    } else {
      res.send({ status: false, message: "Can not send request." });
    }
  } catch (error) {
    next(error);
  }
};

//---------------------------------------------------all Package --------------------------------------------------------

exports.getAllPackage = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skip = (page - 1) * limit;
    const result = {};
    result.totalData = await Package.countDocuments();
    result.data = [];

    if (limit == 0) {
      result.totalPage = 1;
    } else {
      result.totalPage = Math.ceil((await Package.countDocuments()) / limit);
    }

    result.previous = {
      page: page - 1,
      limit,
    };
    if (page == result.totalPage) {
      result.next = {
        page: 0,
        limit,
      };
    } else {
      result.next = {
        page: page + 1,
        limit,
      };
    }

    result.data = await Package.find()
      .select({ password: 0, token: 0, verificationCode: 0 })
      .limit(limit)
      .skip(skip)
      .sort({ date: -1 });

    if (result.totalData < 1) {
      res.status(400).send({ status: false, message: "Package not found." });
    } else {
      res.json({ status: true, result });
    }
  } catch (error) {
    next(error);
  }
};

//---------------------------------------------------search Package--------------------------------------------------------

exports.searchPackage = async (req, res, next) => {
  try {
    const dcount = await Package.find({
      $or: [
        { name: { $regex: req.query.search, $options: "i" } },
        { price: { $regex: req.query.search, $options: "i" } },
        { days: { $regex: req.query.search, $options: "i" } },
      ],
    }).count();

    if (dcount < 1) {
      res.status(400).send({ status: false, message: "Package not found." });
    } else {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const skip = (page - 1) * limit;
      const result = {};
      result.data = [];

      result.data = await Package.find({
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { price: { $regex: req.query.search, $options: "i" } },
          { days: { $regex: req.query.search, $options: "i" } },
        ],
      })
        .select({ __v: 0 })
        .limit(limit)
        .skip(skip)
        .sort({ data: -1 });

      result.totalData = dcount;

      if (limit == 0) {
        result.totalPage = 1;
      } else {
        result.totalPage = Math.ceil(dcount / limit);
      }

      result.previous = {
        page: page - 1,
        limit,
      };

      if (page == result.totalPage) {
        result.next = {
          page: 0,
          limit,
        };
      } else {
        result.next = {
          page: page + 1,
          limit,
        };
      }

      res.json({ status: true, result });
    }
  } catch (error) {
    next(error);
  }
};

//---------------------------------------------------single Package --------------------------------------------------------

exports.getSingle = async (req, res, next) => {
  try {
    const data = await Package.findById(req.params.id);

    if (data.id != undefined) {
      res.send({ status: true, data });
    } else {
      res.send({ status: false, message: "Not found." });
    }
  } catch (error) {
    next(error);
  }
};

//--------------------------------------------------------------------delete Package---------------------------------------------------

exports.deletePackage = async (req, res, next) => {
  try {
    const d = await Package.findById(req.params.id).populate("user");

    if (d == null) {
      res.status(404).send({ status: false, message: "Package not found." });
    } else {
      const data = await Package.findByIdAndDelete(req.params.id);
      if (data == null) {
        await res
          .status(400)
          .send({ status: false, message: "Faild to delete Package." });
      } else {
        res.json({ status: true, message: "Package delete successfully." });
      }
    }
  } catch (error) {
    next(error);
  }
};
