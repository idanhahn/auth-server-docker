// GET ALL
exports.get_all = async (req, res) => {

    // TODO: add logging

    try{
        // const apiElements = await APIElement.get_all()
        // res.status(200).json(apiElements)
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
}

// GET BY :ID
exports.get_by_id = async (req, res) => {

    // TODO: add logging

    try{
        // const apiElement = await APIElement.get_by_id({
        //    _id: req.params.id
        // })
        // res.status(200).json(apiElement)
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
}

// CREATE
exports.create = async (req, res) => {

    // TODO: add logging

    // const newAPIElement = new APIElement({
    //    data: req.body.data
    // });

    try{
        // const dbResponse = await APIElement.create()
        // res.status(200).json(dbResponse)
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
}

// REMOVE BY :ID
exports.remove_by_id = async (req, res) => {

    // TODO: add logging

    try{
        // const apiElement = await APIElement.remove({
        //    _id: req.params.id
        // })
        // res.status(200).json(apiElement)
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
}

// UPDATE BY :ID
exports.update_by_id = async (req, res) => {

    // TODO: add logging

    try {
        // const apiElement = await APIElement.update({
        //    _id: req.params.id
        // }, {
        //    update: {req.body.data}
        // }
        // )
        // res.status(200).json(apiElement)
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
}
