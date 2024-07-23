module.exports.models = {
    schema: true,
    migrate: 'safe',
    attributes: {
    createdAt: { type: 'number', autoCreatedAt: true, },
    updatedAt: { type: 'number', autoUpdatedAt: true, },
    id: { type: 'number', autoIncrement: true, },
  },


  dataEncryptionKeys: {
    default: 'h8YC3D6e/Nz8HpIFD/SeMinfKAevnmQcpZy1bs3Lm60='
  },


  cascadeOnDestroy: true


};
