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


controller.hears(['Hello', 'hi', '田島さん'], 'direct_message,direct_mention,mention', function(bot, message) {

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
            bot.reply(message, '無理して道を急いでもすぐ息切れしてしまうから、結局自分のペースで着実に前に進んでいる人には長期的な視点で見ると勝てない。でも人一倍努力して自分のペースを上げることは出来る。要はどれだけ先を見てるか、どれだけ高いところを見てるかなんだと思う。');
        }else if(0.05<=rand<0.1){
            bot.reply(message, '仕事のあらゆる場面において、多分大丈夫だろう、という判断をするのではなく、念のため手を打っておこう、という行動ができる人は本当に強いと思う。継続的に成果を出している人は、こういうところが徹底している。');
        }else if(0.1<=rand<0.15){
            bot.reply(message, 'あらゆる情報は、70%の内容理解だとなかなか成果に繋がらない。120%理解してはじめて、成果に繋がる具体的なアクションに繋げられる気がする。成果を出している人が、理由や背景をしつこく聞いてくるのはよくわかる。大切なのは、情報の取捨選択と情報の深堀からどれだけ成果へ繋げられるか。');
        }
        else if(0.15<=rand<0.2){
            bot.reply(message, 'ここまでの世の中の進化は、人間の顕在化した欲求の実現が多かったからある程度予見できたけど、ここから先は創造力の領域が大きくなりそう。人間の潜在的な欲求を実現させていくステージに突入しつつある。');
        }else if(0.2<=rand<0.3){
            bot.reply(message, '若いうちに具体的な夢を見つけるのはとても難しいこと。なぜなら、殆どの人はこれまでの人生の中で見てきた、経験した範囲の中でしかイメージできないから。だから、具体的な夢を持ってないことを嘆く必要は何もなく、とにかく沢山の良い人と出会い、広い世界に触れることが夢の発見の第一歩だと思う。');
        }else if(0.3<=rand<0.4){
            bot.reply(message, '熊本の地震でのペットの迷子相次ぐ　SNSに投稿されている保健所で保護されている犬、迷い犬を保護中で買い主を探している人、逃げだした飼い犬を探している人　無事に買い主のもとに戻れますように ');
        }else if(0.4<=rand<0.5){
            bot.reply(message, '普段俯瞰してものごとを見ようとしているつもりでも、時間が経って冷静に振り返ってみると、自分の思考にバイアスがかかっていたり近視眼的な見方をしてしまっていることがある。自分の経験値を増やしたり、視野を広げることも大切だけど、自分自身の心の持ち方が改めて大切だなと感じる瞬間。');
        }else if(0.5<=rand<0.6){
            bot.reply(message, '日本における大企業の経営者は、オーナー企業を除いてほとんど株式を持たず、北米ほど報酬も高くなく、数年に一度ポジションが代わるケースが多いけど、そんな条件でガチの世界戦をどの程度戦えるのか疑問。経営者としての能力や戦略以前に、ガバナンスの在り方や報酬制度をまず見直すべきだと思う。');
        }
        else if(0.6<=rand<0.7){
            bot.reply(message, 'あらゆるものは人間の根源的欲求に近づく方向に合理的に進化してきたし、ネットやテクノロジーがその進化スピードを加速させてきた。そして、人間の根源的欲求のほとんどが満たされつつある今、人間がまだ気付いていない未知の欲求を創造し、実現させていく時代に突入してきている気がする。');
        }
        else if(0.7<=rand<0.8){
            bot.reply(message, 'リスクとリターンは表裏一体。重病患者への医者の説明として、A病院「受けた患者の10人に1人が死亡する手術です」、B病院「死亡する可能性もあるけど、生存率90%の手術です」これは両方意味は同じだけどニュアンスは全く違う。リスク、リターンどっちを見て生きるかで大きく人生変わると思う。');
        }else if(0.8<=rand<0.9){
            bot.reply(message, 'ある起業家が、「人生はポジティブスパイラルを生み出すゲームだ」と言ってたんだけど、うまくいっている起業家はこれを意識的に実践している気がする。リアル、ネットの両方でポジティブスパイラルが効いている起業家は、応援者が指数関数的に増え、強力な事業推進力を生む。');
        }else{
            bot.reply(message, '北尾さん最近ギャルの方はどうなん？');
        
        // }
    };
});

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

// ここから下は田島さん名言テスト
controller.hears('', ['direct_mention'], function(bot, message) {
    bot.reply(message, 'hahaha');
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