const mongoose = require('mongoose')

const menuitem=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    taste:{
        type:String,
        enum:["spicy","sweet","salty", "sour", "bitter"]
    },
    is_drink:{
        type:Boolean,
        required:true
    },
    ingridients:{
        type:[String],
        required:true,
    },
    num_sales:{
        type:String,
        required:true
    }
})

const menu=mongoose.model('menu',menuitem);

module.exports=menu;
