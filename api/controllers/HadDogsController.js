/**
 * HadDogsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // Método para criar um novo registro de HadDog
  create: async function (req, res) {
    try {

            // Dados enviados pelo formulário
            const formData = req.body;

            // Dados do checkbox
            const reasonsData = {
              kids_company: formData.kids === 'true' ? true : false,
              adults_company: formData.adults === 'true' ? true : false,
              appearance: formData.looking === 'true' ? true : false,
              dogs_company: formData.dogs_company === 'true' ? true : false,
              responsibility_to_children: formData.responsibility === 'true' ? true : false,
              friends_have: formData.dreason6 === 'true' ? true : false,
              protection: formData.protection === 'true' ? true : false,
              help_friend_couldnt_keep_it: formData.help_friend === 'true' ? true : false,
              save_my_life: formData.save_life === 'true' ? true : false,
              was_cute: formData.cuteness === 'true' ? true : false,
              chose_me: formData.dreason11 === 'true' ? true : false,
              gift: formData.gift === 'true' ? true : false,
              parents_had: formData.dreason15 === 'true' ? true : false,
              met_media: formData.dreason14 === 'true' ? true : false,
              others: formData.other_reason === 'true' ? formData.other_reason_detail : false,
            };
      
            // Criar registro para as razões do checkbox
            const reasonsRecord = await ReasonsToHaveTheDog.create(reasonsData).fetch();
      

      const newHadDog = await Had_dog.create({
        id_user: formData.id_user,
        dogs_name: formData.dogs_name,
        belonging: formData.belonging,
        dogs_personality: formData.dogs_personality,
        how_much_stayed: formData.how_much_stayed,
        first_dog: formData.first_dog,
        number_dogs: formData.number_dogs,
        number_cats: formData.number_cats,
        inclusion_year: formData.inclusion_year,
        castrated: formData.castrated,
        castration_age: formData.castration_age,
        breed: formData.breed,
        breed_type: formData.breed_type,
        dogs_origin: formData.dogs_origin,
        cost_to_acquire: formData.cost_to_acquire,
        reason_live_with_other_dog: formData.reason_live_with_other_dog,
        dogs_characteristics: formData.dogs_characteristics,
        involved_decision: formData.involved_decision,
        favorite_things_first_weeks: formData.favorite_things_first_weeks,
        dont_liked_things: formData.dont_liked_things,
        vet_visits: formData.vet_visits,
        number_of_vet_visits: formData.number_of_vet_visits,
        visit_reason: formData.visit_reason,
        stopped_live_with_dog: formData.stopped_live_with_dog,
        stopped_live_dogs_age: formData.stopped_live_dogs_age,
        reason_stopped_living: formData.reason_stopped_living,
        would_live_with_other_dog: formData.would_live_with_other_dog,
        reason_would_live_with_other_dog: formData.reason_would_live_with_other_dog,
      }).fetch();

      // Cria um novo registro com os dados recebidos no corpo da requisição e retorna o registro criado
      // Retorna o registro criado como resposta
      return res.status(201).json(newHadDog);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};