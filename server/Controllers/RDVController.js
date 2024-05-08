import RDV from "../modles/RDV.js";

export const AddRDV = async (req, res) => {
    const { Patient, Medecin, day, month } = req.body;
    const today = new Date();

    try {
        const rdvsOfMed = await RDV.find({ Medecin });

        if (!rdvsOfMed || rdvsOfMed.length === 0) {
            // If no existing RDVs for the doctor, create a new appointment
            const dt = new Date(today.getFullYear(), month - 1, day);
            const rdv = new RDV({ Patient, Medecin, dateRdv: dt, Num: 1 });
            await rdv.save();
            return res.status(200).json({ rdv });
        }

        const nextRdvForPatient = await RDV.findOne({
            Medecin,
            Patient,
            dateRdv: { $gte: today }
        });

        if (nextRdvForPatient) {
            return res.status(200).json({ message: "There is already an appointment with this doctor." });
        }

        const docRDVs = await RDV.find({ Medecin, dateRdv: { $gte: today } });

        const existingRDV = docRDVs.find(item => {
            return (
                item.dateRdv.getDate() === day &&
                item.dateRdv.getMonth() === (month - 1) &&
                item.Num >= 8
            );
        });

        if (existingRDV) {
            return res.json({ message: "This day is not available." });
        }

        const dt = new Date(today.getFullYear(), month - 1, day);
        const existingRDVWithLessThan8 = docRDVs.find(item => {
            return (
                item.dateRdv.getDate() === day &&
                item.dateRdv.getMonth() === (month - 1) &&
                !(item.Num >= 8) // Ensure item.Num is less than 8
            );
        });

        let rdv="";
        if (existingRDVWithLessThan8) {
            const newNum = existingRDVWithLessThan8.Num + 1;
             rdv = new RDV({ Patient, Medecin, dateRdv: dt, Num: newNum });
            await rdv.save();
        } else {
             rdv = new RDV({ Patient, Medecin, dateRdv: dt, Num: 1 });
            await rdv.save();
        }

        return res.status(200).json({ rdv });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const getRDV = async (req, res) => {
  const id = req.params.id;
  try {
    const rdnwithId = await RDV.findOne({ _id: id }).populate("Medecin", "-password").populate("Patient", "-password").exec();

    return res.status(400).json({
      "Patient": rdnwithId.Patient,
      "Medecin": rdnwithId.Medecin,
      "Date": rdnwithId.dateComplet,
      "Number ": rdnwithId.Num
    });


  } catch (err) { console.log(err); }
}


export const getMyRDVs = async (req, res) => {
  const { userId } = req.params;
  try {
    const MyRdvs = await RDV.find({ Patient: userId }).populate("Medecin", "-password").populate("Patient", "-password").exec();

    if (!MyRdvs) return res.status(200).json({ message: "No Rdv found" });
    
    return res.json({ MyRdvs });

  } catch (err) { console.log(err); }
}

export const getDodRdvs= async(req,res)=>{
  const { userId } = req.params;
  
  try {
    const MyRdvs = await RDV.find({ Medecin: userId }).populate("Medecin", "-password").populate("Patient", "-password").exec();

    if (!MyRdvs) return res.status(200).json({ message: "No Rdv found" });
    return res.status(200).json({ MyRdvs });
  } catch (err) { console.log(err); }
}



/**
 *  try {
    const today = new Date();
    const firstRDV = await RDV.findOne({
      Patient, Medecin});


    if(!firstRDV){
  
      RDvtoday = RDV({
        Patient, Medecin, dateComplet: today,
        DayofWeek:today.getDay(), Num: 1
      })
      await RDvtoday.save();
      return res.json({ RDvtoday });
    }

    const RDVsMedecinWith = await RDV.findOne({
      Patient, Medecin,
    });

    if (RDVsMedecinWith) {
      return res.json({ message: "You can't create new  RDV with same doctor befor you pass last one !" });
    }

  const RDVsMedecin = await RDV.find({ Medecin,dateComplet: { $gte: today }});

    if (!RDVsMedecin) {
      console.log("doctor has no rnd yet ");

      if (today.getDay() != 5) {
        let nextDay = newDate(today);
        nextDay.setDate(today.getDate()+1)

        RDvtoday = RDV({
          Patient, Medecin, dateComplet: nextDay,
          DayofWeek: today.getDay() + 1, Num: 1
        })
        await RDvtoday.save();
        return res.json({ RDvtoday });
      } else {
        RDvtoday = RDV({
          Patient, Medecin, dateComplet: today.getDate() + 1,
          DayofWeek: today.getDay() + 1, Num: 1
        })
        const nrdv = await RDvtoday.save();
        return res.json({ RDvtoday });
      }
    }

    console.log("rdvs of medcine",RDVsMedecin)

    const lastRDV = RDVsMedecin[RDVsMedecin.length - 1];

    if (lastRDV.Num >= 16) {
      console.log("rnd >=16");
      if (lastRDV.dateComplet.getDay != 0) {
        nextDay= nextDay.setDate( lastRDV.dateComplet.getDate() + 1)

        RDvtoday = RDV({
          Patient, Medecin, dateComplet:nextDay,
          DayofWeek: lastRDV.dateComplet.getDay() + 1, Num: 1
        })
        await RDvtoday.save();
        return res.json({ RDvtoday });
      } else {
        nextDay= nextDay.setDate( lastRDV.dateComplet.getDate() + 2)

        RDvtoday = RDV({
          Patient, Medecin, dateComplet:nextDay,
          DayofWeek: lastRDV.dateComplet.getDay() + 2, Num: 1
        })
        await RDvtoday.save();
        return res.json({ RDvtoday });
      }

    } else {
      
      RDvtoday = RDV({
        Patient, Medecin, dateComplet: lastRDV.dateComplet,
        DayofWeek: lastRDV.dateComplet.getDay(), Num: lastRDV.Num + 1
      })
      await RDvtoday.save();
      return res.json({ RDvtoday });
    }

    //
    // if (!RDVsMedecin) {
    //  
    //   if (today.getDay() != 0) {
    //     RDvtoday = RDV({
    //       Patient, Medecin, dateComplet: today, DayofWeek: today.getDay(), Num: 1
    //     })
    //     await RDvtoday.save();
    //   }
    //   else {
    //     RDvtoday = RDV({
    //       Patient, Medecin, dateComplet: today, DayofWeek: today.getDay() + 1, Num: 1
    //     })
    //     await RDvtoday.save();
    //   }

    //   return res.status(400).json({
    //     "Patient": RDvtoday.Patient,
    //     "Medecin": RDvtoday.Medecin,
    //     "Date": RDvtoday.dateComplet,
    //     "Number": RDvtoday.Num
    //   });

    // }
    // else {

    //   let RdvToday;
    //   const dayToday = today.getDay();

    //   const todyRDVs = await RDV.find({ Patient, Medecin, DayofWeek: dayToday });

    //   if (dayToday === 0 || todyRDVs.length >= 16) {

    //     const RdvDate = new Date(today);
    //     RdvDate.setDate(today.getDate() + 1);

    //     const rdvToGetNum = await RDV.find({ Patient, Medecin, DayofWeek: dayToday });
    //     RdvToday = RDV({
    //       Patient, Medecin, dateComplet: RdvDate,
    //       DayofWeek: RdvDate.getDay(), Num: rdvToGetNum.length + 1
    //     });

    //     await RdvToday.save();



    //     res.status(400).json({
    //       "Patient": RdvToday.Patient,
    //       "Medecin": RdvToday.Medecin,
    //       "Date": RdvToday.dateComplet,
    //       "Number": rdvToGetNum.length
    //     })
    //   } else {

    //     const RDvtoday = RDV({
    //       Patient, Medecin, dateComplet: today, DayofWeek: today.getDay(), Num: todyRDVs.length
    //     })

    //     await RDvtoday.save();
    //     return res.status(400).json({
    //       "Patient": RDvtoday.Patient,
    //       "Medecin": RDvtoday.Medecin,
    //       "Date": RDvtoday.dateComplet,
    //       "Number ": todyRDVs.length
    //     });
    //   }

    // }


  } 
 */