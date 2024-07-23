/**
 * WantDogsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // Método para criar um novo registro de desejo de ter um cachorro
  create: async function (req, res) {
    try {
      const formData = req.body;

      const reasonsData = {
        kids_company: formData.kids_company === "true" ? true : false,
        adults_company: formData.adults_company === "true" ? true : false,
        appearance: formData.appearance === "true" ? true : false,
        dogs_company: formData.dogs_company === "true" ? true : false,
        responsibility_to_children:
          formData.responsibility === "true" ? true : false,
        friends_have: formData.friends_have === "true" ? true : false,
        protection: formData.protection === "true" ? true : false,
        help_friend_couldnt_keep_it:
          formData.help_friend_couldnt_keep_it === "true" ? true : false,
        save_my_life: formData.save_my_life === "true" ? true : false,
        was_cute: formData.was_cute === "true" ? true : false,
        chose_me: formData.chose_me === "true" ? true : false,
        gift: formData.gift === "true" ? true : false,
        parents_had: formData.parents_had === "true" ? true : false,
        met_media: formData.met_media === "true" ? true : false,
        others: formData.others === "true" ? formData.others_detail : false,
      };

      const reasonsRecord = await ReasonsToHaveTheDog.create(
        reasonsData
      ).fetch();

      const dogData = {
        user_id: formData.user_id,
        dogs_size: formData.dogs_size,
        fur_length: formData.fur_length,
        fur_color: formData.fur_color,
        dogs_sex: formData.dogs_sex,
        dogs_age: formData.dogs_age,
        breed: formData.breed,
        reasons_to_have_the_dog_id: reasonsRecord.id,
        already_have_a_name: formData.already_have_a_name,
        acquire_intention: formData.acquire_intention,
        possible_name: formData.possible_name,
        name_reason: formData.name_reason,
        bringing_date: formData.bringing_date,
        wanted_personality: formData.wanted_personality,
        search_expenses: formData.search_expenses,
        expense_value: formData.expense_value,
        contact_permission: formData.contact_permission,
      };

      const dog = await WantDog.create(dogData).fetch();

      return res.status(201).json({ message: "Formulário salvo com sucesso!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao salvar o formulário" });
    }
  },

  // Método para buscar todos os registros de desejos de ter um cachorro
  find: async function (req, res) {
    try {
      // Busca todos os registros na tabela WantDog
      const wantDogs = await WantDog.find();
      // Retorna a lista de registros com status 200 (OK)
      return res.status(200).json(wantDogs);
    } catch (error) {
      // Em caso de erro, retorna uma resposta com status 500 (Internal Server Error) e a mensagem de erro
      return res.status(500).json({ error: error.message });
    }
  },

  // Método para buscar um único registro de desejo de ter um cachorro pelo ID
  findOne: async function (req, res) {
    try {
      // Busca um registro pelo ID fornecido nos parâmetros da requisição
      const wantDog = await WantDog.findOne({ id: req.params.id });
      if (!wantDog) {
        // Se não encontrar o registro, retorna status 404 (Not Found) e uma mensagem de erro
        return res.status(404).json({ error: "Record not found" });
      }
      // Retorna o registro encontrado com status 200 (OK)
      return res.status(200).json(wantDog);
    } catch (error) {
      // Em caso de erro, retorna uma resposta com status 500 (Internal Server Error) e a mensagem de erro
      return res.status(500).json({ error: error.message });
    }
  },
};
