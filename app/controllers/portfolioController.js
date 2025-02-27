import portfolioModel from "../models/portfolioModel.js";

export const createPortfolio = async (req, res) => {
    try {
        const { title, description, img, codelink, livelink } = req.body;

        const portfolio = new portfolioModel({ 
            title, 
            description, 
            img, 
            codelink, 
            livelink
        });

        await portfolio.save();

        res.status(201).json({
            status:"success", 
            message: "Portfolio created successfully", 
            data:portfolio 
        });

    } catch (error) {
        console.error("Error creating portfolio:", error);

        res.status(500).json({
            status:"failed", 
            message: "Internal Server Error", 
        });
    }
};
export const allPortfolio = async (req, res) => {
    try {
        // Fetch all portfolio items for the authenticated user
        const portfolios = await portfolioModel.find({});

        // Check if there are any portfolios
        if (portfolios.length === 0) {
            return res.status(404).json({status:"failed", message: "No portfolios found" });
        }

        res.status(200).json({status:"success",data:portfolios });

    } catch (error) {
        console.error("Error fetching portfolios:", error);
        res.status(500).json({ 
            error: "Internal Server Error", 
            details: error.message 
        });
    }
};
export const updatePortfolio = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, img, codelink, livelink } = req.body;

        // Check if the portfolio exists
        const portfolio = await portfolioModel.findById(id);

        if (!portfolio) {
            return res.status(404).json({status:"failed", message: "Portfolio not found" });
        }

        // Update the portfolio
        const updatedPortfolio = await portfolioModel.findByIdAndUpdate(
            id,
            { title, description, img, codelink, livelink },
            { new: true, runValidators: true } // Returns updated document & applies validation
        );

        res.status(200).json({
            status:"success",
            message: "Portfolio updated successfully",
            portfolio: updatedPortfolio,
        });

    } catch (error) {
        console.error("Error updating portfolio:", error);
        res.status(500).json({
            status:"failed",
            message: "Internal Server Error",
        });
    }
};
export const deletePortfolio = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the portfolio exists
        const portfolio = await portfolioModel.findById(id);
        if (!portfolio) {
            return res.status(404).json({ status:"failed", message: "Portfolio not found" });
        }

      
        // Delete the portfolio
        await portfolioModel.findByIdAndDelete(id);

        res.status(200).json({status:"success", message: "Portfolio deleted successfully" });

    } catch (error) {
        console.error("Error deleting portfolio:", error);
        res.status(500).json({
            status:"failed",
            message: "Internal Server Error",
        });
    }
};