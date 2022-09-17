import Product from "../models/product.js";

export const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).select("name");
  res.status(200).json({ products, nbHits: products.length });
};

export const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }

  if (company) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  let result = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const filedList = fields.split(",").join(" ");
    result = result.select(filedList);
  }
  const page = Number(req.query.page) ?? 1;
  const limit = Number(req.query.limit) ?? 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [fields, operator, value] = item.split("-");
      if (options.includes(fields)) {
        queryObject[fields] = { [operator]: Number(value) };
      }
    });
  }
  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};
