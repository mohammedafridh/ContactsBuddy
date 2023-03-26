import ContactModel from "../Models/ContactModel.js";

//create a contact
export const createContact = async(req,res)=>{

    const {name,contactNumber} = req.body

    let emptyFields = []

    if(!name){
        emptyFields.push('name')
    }if(!contactNumber){
        emptyFields.push('contactNumber')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error: '*Please fill all the fields', emptyFields})
    }

    try{
            const user = await ContactModel.create(req.body)
            res.status(200).json(user)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

//get a contact
export const getContact = async(req,res)=>{
    const id = req.params.id
    const contact = await ContactModel.findById(id)

    try{
        if(contact){
            res.status(200).json(contact)
        }else{
            res.status(403).json('Contact not found')
        }
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

//get all contacts
export const getAllContacts = async(req,res)=>{
    const contacts = await ContactModel.find().collation({locale:'en', strength:2}).sort({name:1})
    
    try{
        res.status(200).json(contacts)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

//update a contact
// export const updateContact = async(req,res)=>{
//     const id = req.params.id
//     const {name,contactNumber,address} = req.body

//     try{
//         const contact = await ContactModel.findById(id)
//         const updateContact = await contact.updateOne({$set:req.body})
//         res.status(200).json('updated successfully')
//     }catch(error){
//         res.status(500).json({error:error.message})
//     }
// }

export const updateContact = async (req, res) => {
    try {
      const contact = await ContactModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(200).json(contact)
    } catch (error) {
      res.status(500).json({ error:error.message})
    }
  }

//delete a contact
export const deleteContact = async(req,res)=>{
    const {id} = req.params

    try{
        const contact = await ContactModel.findOneAndDelete({_id: id})
        res.status(200).json(contact)
    }catch(error){
        res.status(500).json(error)
    }
}

//search contact

// export const searchContact = async(req,res)=>{
//     const {query} = req.query

//     try{
//         const data = await ContactModel.find({name:{ $regex: query, $options: 'i' }})
//         res.status(200).json(data)
//     }catch(error){
//         res.status(500).json({error:error.message})
//     }
// }