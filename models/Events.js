module.exports = (sequelize, DataType) => {
    const Evento = sequelize.define('Events', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: DataType.STRING,
        tema: DataType.STRING,
        descricao: DataType.STRING,
        data_inicio: DataType.DATE,
        data_fim: DataType.DATE,
        hora_inicio: DataType.STRING,
        hora_fim: DataType.STRING,
        preco: DataType.STRING,
        inicio_vendas: DataType.DATE,
        link_imagem: DataType.STRING,
        link_video: DataType.STRING
    },{
        tableName: 'events',
        timeStamps: false
    })

    return Evento
}