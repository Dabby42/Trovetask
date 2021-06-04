import asyncHandler from '../middleware/asyncHandler';
import Portfolio from '../models/Portfolio';


/**
 * @desc   Create a Portfolio
 * @route  POST /api/v1/potfolio
 * @access Private
 */
export const createPortfolio = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { symbol, totalQuantity, equityValue, pricePerShare} = req.body;

  const portfolio = new Portfolio({
    symbol,
    totalQuantity,
    equityValue,
    pricePerShare,
    user: _id
  });

  await portfolio.save();

  return res.status(201).json({
    status: 201,
    success: true,
    data: portfolio,
    message: 'Portfolio created successfully'
  })
});


/**
 * @desc   Get a Single Portfolio
 * @route  GET /api/v1/portfolio/:portfolioId
 * @access Private
 */
 export const getSinglePortfolio = asyncHandler(async (req, res) => {
  const { portfolioId } = req.params;

  const portfolio = await Portfolio.findById({portfolioId})

  return res.status(200).json({
    status: 200,
    success: true,
    data: portfolio,
    message: 'Portfolio fetched successfully'
  })
});

/**
 * @desc   Get User Porfolio
 * @route  GET /api/v1/portfolio
 * @access Private
 */
 export const getUserPortfolio = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const portfolio = await Portfolio.find({ user: _id });

  return res.status(200).json({
    status: 200,
    success: true,
    data: portfolio,
    message: 'User Portfolio fetched successfully'
  })
});

/**
 * @desc   Get User Porfolio Value
 * @route  GET /api/v1/portfolio/value
 * @access Private
 */
 export const getUserPortfolioValue = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const result = await Portfolio.find({ user: _id });
  let equityValueArr = [];
  for (let i = 0; i < result.length; i++){
    equityValueArr.push(result[i].equityValue);
  }
  let portfolioValue = equityValueArr.reduce(sum);

  return res.status(200).json({
    status: 200,
    success: true,
    portfolioValue,
    message: 'User Portfolio Value fetched successfully'
  })
});


/**
 * @desc   Delete a Portfolio
 * @route  DELETE /api/v1/portfolio/:portfolioId
 * @access Private
 */
export const deletePortfolio = asyncHandler(async (req, res) => {
  const { portfolioId } = req.params;

  await Contact.findByIdAndDelete({portfolioId})

  return res.status(200).json({
    status: 200,
    success: true,
    message: 'Portfolio deleted successfully'
  })
});

const sum = (total, num) => {
  return total + num;
}
