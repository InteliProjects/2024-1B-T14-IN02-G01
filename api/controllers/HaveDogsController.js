/**
 * HaveDogsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// api/controllers/HaveDogsController.js
module.exports = {
  create: async function (req, res) {
    try {
      const formData = req.body;

      const reasonsData = {
        kids_company: formData.kids === "true" ? true : false,
        adults_company: formData.adults === "true" ? true : false,
        appearance: formData.looking === "true" ? true : false,
        dogs_company: formData.dogs_company === "true" ? true : false,
        responsibility_to_children:
          formData.responsibility === "true" ? true : false,
        friends_have: formData.friends === "true" ? true : false,
        protection: formData.protection === "true" ? true : false,
        help_friend_couldnt_keep_it:
          formData.help_friend === "true" ? true : false,
        save_my_life: formData.save === "true" ? true : false,
        was_cute: formData.cuteness === "true" ? true : false,
        chose_me: formData.chose === "true" ? true : false,
        gift: formData.gift === "true" ? true : false,
        parents_had: formData.dreason15 === "true" ? true : false,
        met_media: formData.dreason14 === "true" ? true : false,
        others: formData.dreason13 === 'true' ? formData.dreasonother : false,
      };

      const reasonsRecord = await ReasonsToHaveTheDog.create(
        reasonsData
      ).fetch();

      const dogData = {
        id_user: formData.id_user,
        dogs_name: formData.dogs_name,
        dogs_sex: formData.dogs_sex,
        tutor: formData.tutor,
        castrated: formData.castrated,
        castration_date: formData.castration_date,
        time_w_dog: formData.time_w_dog,
        first_dog: formData.first_dog,
        number_pets: formData.number_pets, // Certificar-se de que este valor está presente e correto
        dogs_age: formData.dogs_age,
        breed: formData.breed,
        dogs_breed_type: formData.dogs_breed_type,
        dogs_origin: formData.origin,
        paid_to_acquire: formData.paid_to_acquire,
        age_dog_arrived: formData.dogs_age,
        dogs_personality: formData.dogs_personality,
        reasons_to_have_the_dog: reasonsRecord.id,
        characteristics: formData.characteristics,
        involved_in_decision: formData.involved_in_decision,
        couldnt_keep_a_dog_before: formData.couldnt_keep_a_dog_before,
        vet_visits: formData.vet,
        number_of_vet_visits: formData.number_of_vet_visits,
        about_dog: formData.about_dog,
      };

      const dog = await HaveDog.create(dogData).fetch();

      return res.status(201).json({ message: "Formulário salvo com sucesso!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao salvar o formulário" });
    }
  },
  find: async function (req, res) {
    try {
      const dogs = await HaveDog.find();
      return res.status(200).json(dogs);
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
      return res
        .status(500)
        .json({ error: "Erro ao buscar registros", details: error.message });
    }
  },
  findOne: async function (req, res) {
    try {
      const dog = await HaveDog.findOne({ id: req.params.id });
      if (!dog) {
        return res.status(404).json({ error: "Registro não encontrado" });
      }
      return res.status(200).json(dog);
    } catch (error) {
      console.error("Erro ao buscar registro:", error);
      return res
        .status(500)
        .json({ error: "Erro ao buscar registro", details: error.message });
    }
  },
};
