const AsyncHandler = (fn)=>{
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            console.error("Error in async handler:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
export default AsyncHandler;    