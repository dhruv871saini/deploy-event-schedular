import eventModel from "../models/eventModels.js";


// Create Event
export const CreateEvent = async (req, res) => {
  const { names, date, time, location, description, category } = req.body;

  if (!names || !date || !time || !location || !description || !category) {
    return res.status(400).json({
      message: "All fields are required: names, date, time, location, description, category.",
    });
  }

  try {
    // Create a new event
    
    const event = new eventModel({
      names,
      date,//yymmdd
      time,//hhmm
      location,
      description,
      category,
      userId:req.user.id
    });
    const saveEvent = await event.save();
    res.status(200).json({message:"successfully created ",saveEvent});
  } catch (error) {
    console.error("Error in CreateEvent API:", error);
    res.status(500).json({ message: "Internal server error while creating the event." });
  }
};
// get event api
export const getEvent = async (req, res) => {
  try {
    const events = await eventModel.find({userId:req.user.id});
    // console.log({events})
    res.status(200).json(events);
  
  } catch (error) {
    console.error("Error in getEvent API:", error);
    res.status(500).json({
      message: "Internal server error while retrieving all events.",
    });
  }
};

// Update Event
export const updateEvent = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ message: "No parameter provided to update the event." });
  }

  try {
    const updatedEvent = await eventModel.findByIdAndUpdate({_id:id,userId:req.user.id}, req.body, {
      new: true, // Return the updated document
    });

    if (!updatedEvent) {
      return res.status(400).json({
        message: "No updates applied. Event not found or no changes provided.",
      });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error in updateEvent API:", error);
    res.status(500).json({
      message: "Internal server error while updating the event.",
    });
  }
};

// Delete Event
export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "No deletion ID provided.",
    });
  }

  try {
    const deletedData = await eventModel.findByIdAndDelete({_id:id,userId:req.user.id});

    if (!deletedData) {
      return res.status(400).json({ message: "Cannot delete. Event not found." });
    }

    res.status(200).json({ message: "Event deleted successfully." });
  } catch (error) {
    console.error("Error in deleteEvent API:", error);
    res.status(500).json({
      message: "Internal server error while deleting the event.",
    });
  }
};
