import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import  SimpleSchema  from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');


if(Meteor.isServer){

    Meteor.publish('linksPub', function() {
        // this.userId

        return Links.find({userId: this.userId});
    });

}

Meteor.methods({

    //creation of new Meteor method called links.insert
    'links.insert'(url){
        if (!this.userId) {
            throw new Meteor.error('not-authorized');
        }





        //validation here
        new SimpleSchema({
            url: {
                type: String,
                label: 'Your link is not right',
                regEx: SimpleSchema.RegEx.Url
            }
        }).validate({url});




        //this is the direct Mongo command for inserting into Links db
        Links.insert({
            _id: shortid.generate(),
            url,
            userId: this.userId,
            visible: true,
            visitedCount:0,
            lastVisitedAt: null
        })
    },

    'links.setVisibility'(_id,visible){

       if(!this.userId){
           throw new Meteor.Error('Not authorized');
       }




        new SimpleSchema({
            _id:{
                type:String,
                label: 'You have to put a String value in'
            },
            visible:{
                type:Boolean
            }
        }).validate({_id,visible});



        Links.update({
            _id:_id, userId:this.userId

        },{

            $set: {
                visible: visible
            }

        })


    },

    'links.trackVisit'(_id){



        new SimpleSchema({
            _id:{
                type:String
            }
        }).validate({_id});


        Links.update({_id},{
            $set:{
                lastVisitedAt:new Date().getTime()
            },
            $inc:{
                visitedCount: 1
            }
        });

    }







});






