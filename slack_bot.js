/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Slack bot built with Botkit.

This bot demonstrates many of the core features of Botkit:

* Connect to Slack using the real time API
* Receive messages based on "spoken" patterns
* Reply to messages
* Use the conversation system to ask questions
* Use the built in storage system to store and retrieve information
  for a user.

# RUN THE BOT:

  Get a Bot token from Slack:

    -> http://my.slack.com/services/new/bot

  Run your bot from the command line:

    token=<MY TOKEN> node slack_bot.js

# USE THE BOT:

  Find your bot inside Slack to send it a direct message.

  Say: "Hello"

  The bot will reply "Hello!"

  Say: "who are you?"

  The bot will tell you its name, where it is running, and for how long.

  Say: "Call me <nickname>"

  Tell the bot your nickname. Now you are friends.

  Say: "who am I?"

  The bot will tell you your nickname, if it knows one for you.

  Say: "shutdown"

  The bot will ask if you are sure, and then shut itself down.

  Make sure to invite your bot into other channels using /invite @<my bot>!

# EXTEND THE BOT:

  Botkit has many features for building cool and useful bots!

  Read all about it here:

    -> http://howdy.ai/botkit

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var Botkit = require('./lib/Botkit.js');
var os = require('os');

var controller = Botkit.slackbot({
    debug: true
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();


controller.hears(['みつは', '三葉', "Swift"], 'direct_message,direct_mention,mention', function(bot, message) {

    // bot.api.reactions.add({
    //     timestamp: message.ts,
    //     channel: message.channel,
    //     name: 'robot_face',
    // }, function(err, res) {
    //     if (err) {
    //         bot.botkit.log('Failed to add emoji reaction :(', err);
    //     }
    // });


    controller.storage.users.get(message.user, function(err, user) {
        // if (user && user.name) {
        //     bot.reply(message, 'Hello ' + user.name + '!!');
        // } else {
            var rand = Math.random();
            if (0<=rand<0.05) {
            bot.reply(message, '入れ替わってる〜！？！？');
        }else if(0.05<=rand<0.1){
            bot.reply(message, 'みつやくん、覚えて、ない？');
        }else if(0.1<=rand<0.15){
            bot.reply(message, '朝、目が覚めると、なぜか泣いている。そういうことが、ときどきある');
        }
        else if(0.15<=rand<0.2){
            bot.reply(message, 'ただ、何かが消えてしまったという感覚だけが、目覚めてからも、長く、残る');
        }else if(0.2<=rand<0.3){
            bot.reply(message, '忘れたくないひと、忘れちゃだめなひと');
        }else if(0.3<=rand<0.4){
            bot.reply(message, 'もうこんな街いやや〜　こんな人生いやや〜　来世は東京のイケメン男子にしてください〜');
        }else if(0.4<=rand<0.5){
            bot.reply(message, 'そういう気持ちに捕り憑かれたのは、たぶん、あの日から');
        }else if(0.5<=rand<0.6){
            bot.reply(message, '今頃二人は一緒か... あれ... 私... ？');
        }
        else if(0.6<=rand<0.7){
            bot.reply(message, 'あ');
        }
        else if(0.7<=rand<0.8){
            bot.reply(message, '私たちは、会えば絶対、すぐにわかる');
        }else if(0.8<=rand<0.9){
            bot.reply(message, 'みつやくん、あの、私... 憶えて、ない？');
        }else{
            bot.reply(message, '君の名前は...');
        // }
    };
});

// controller.hears('', ['direct_mention'], function(bot, message) {
//     controller.storage.users.get(message.user, function(err, user) {
//     bot.reply(message, user.name + 'なに〜？');
// };
// });



// おはようのreply
// controller.hears(['おはよう','おはよ'],'direct_message,direct_mention,mention',function(bot,message){
//     controller.storage.users.get(message.user, function(err, user) {
//         bot.reply(message, 'おはよう' + user.name);
//     };
// });


controller.hears(['いでよ',], 'direct_message,direct_mention,mention', function(bot, message) {
    var Flickr = require("flickrapi");
    var flickrOptions = {
        api_kpi: "7bd93bf8be658f7078c5040ec3028b0b",
        secret: "ff73b54df05a74a3"
    };

    Flickr.photos.tokenOnly(flickrOptions, function(error,flickr){
        flickr.photos.search({
            text: 'いでよ',
            color_codes: 1,
            media: 'photos',
            per_page: 100,
            safe_search: 1,
            extras: 'url_z'
        }, 
        function(err,result){
            var photos = result.photos.photo;
            var r = Math.floor(Math.random() * photos.length);
            bot.reply(message, 'アジアNo.1のVCへ!!!'+ photos[0]);
        });
    });
    // controller.storage.users.get(message.user, function(err, user) {
        // if (!user) {
        //     user = {
        //         id: message.user,
        //     };
        // }
        // user.name = name;
        // controller.storage.users.save(user, function(err, id) {
        //     bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
        // });
});

controller.hears(['what is my name', 'who am i'], 'direct_message,direct_mention,mention', function(bot, message) {

    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Your name is ' + user.name);
        } else {
            bot.startConversation(message, function(err, convo) {
                if (!err) {
                    convo.say('I do not know your name yet!');
                    convo.ask('What should I call you?', function(response, convo) {
                        convo.ask('You want me to call you `' + response.text + '`?', [
                            {
                                pattern: 'yes',
                                callback: function(response, convo) {
                                    // since no further messages are queued after this,
                                    // the conversation will end naturally with status == 'completed'
                                    convo.next();
                                }
                            },
                            {
                                pattern: 'no',
                                callback: function(response, convo) {
                                    // stop the conversation. this will cause it to end with status == 'stopped'
                                    convo.stop();
                                }
                            },
                            {
                                default: true,
                                callback: function(response, convo) {
                                    convo.repeat();
                                    convo.next();
                                }
                            }
                        ]);

                        convo.next();

                    }, {'key': 'nickname'}); // store the results in a field called nickname

                    convo.on('end', function(convo) {
                        if (convo.status == 'completed') {
                            bot.reply(message, 'OK! I will update my dossier...');

                            controller.storage.users.get(message.user, function(err, user) {
                                if (!user) {
                                    user = {
                                        id: message.user,
                                    };
                                }
                                user.name = convo.extractResponse('nickname');
                                controller.storage.users.save(user, function(err, id) {
                                    bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
                                });
                            });



                        } else {
                            // this happens if the conversation ended prematurely for some reason
                            bot.reply(message, 'OK, nevermind!');
                        }
                    });
                }
            });
        }
    });
});

// ここから下は三葉名言テスト
controller.hears('', ['direct_mention'], function(bot, message) {
    bot.reply(message, '好きだよ');
})

// ここまで


controller.hears(['shutdown'], 'direct_message,direct_mention,mention', function(bot, message) {

    bot.startConversation(message, function(err, convo) {

        convo.ask('Are you sure you want me to shutdown?', [
            {
                pattern: bot.utterances.yes,
                callback: function(response, convo) {
                    convo.say('Bye!');
                    convo.next();
                    setTimeout(function() {
                        process.exit();
                    }, 3000);
                }
            },
        {
            pattern: bot.utterances.no,
            default: true,
            callback: function(response, convo) {
                convo.say('*Phew!*');
                convo.next();
            }
        }
        ]);
    });
});


controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'],
    'direct_message,direct_mention,mention', function(bot, message) {

        var hostname = os.hostname();
        var uptime = formatUptime(process.uptime());

        bot.reply(message,
            ':robot_face: I am a bot named <@' + bot.identity.name +
             '>. I have been running for ' + uptime + ' on ' + hostname + '.');

    });

function formatUptime(uptime) {
    var unit = 'second';
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'minute';
    }
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'hour';
    }
    if (uptime != 1) {
        unit = unit + 's';
    }

    uptime = uptime + ' ' + unit;
    return uptime;
}
});