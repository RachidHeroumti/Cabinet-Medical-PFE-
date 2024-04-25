import Departement from "../modles/Departement.js";


export const AddDepartement = async (req, res) => {
  const { name, description, services } = req.body;

  if (!name || !description) return res.json({ message: "name or description is empty!!" });
  try {
    let Dep = await Departement.findOne({ name });
    if (!Dep) {
      Dep = Departement({ name, description, services });
      await Dep.save();

      return res.status(400).json({ Dep });
    } else {
      return res.status(400).json({ message: "Departement already existe !" });
    }

  } catch (err) { console.log(err) }
}

export const getdepartments = async (req, res) => {
  
  try {
    const deps = await Departement.find();
    if (!deps) { return res.status(400).json({ message: "depatments not found !" }); }

    res.status(200).json({ deps });
  } catch (err) { console.log(err) }
}
