const requestPromise = require('request-promise');
reqire('dotenv').config();

const jsonget = function(uri) {
  let options = {
    uri: uri,
    transform: function(body) {
      return JSON.parse(body);
    },
  };
  return requestPromise(options);
}

const apiHost = process.env.API_HOST;

// コマンドを受取りアクションを実行
var execute = function(commands, callback) {
  let message = '';
  let err = null;
  foodstuff = commands[0];
  // 食べ物名のみ
  if(commands.length < 2) 
  {
    console.log('参照処理を実施');
    refer(foodstuff).then(function(value) {
      if(value == null) {
        message = foodstuff + 'は登録されていないよ。';
      } else {
        message = foodstuff + 'の期限は' + value + 'だよ。';
      }
      callback(err, message);
    }).catch(function (error) {
      console.log("Error: " + error);
      message = error;
      callback(err, message);
    });
  }
  // 日付指定
  else if ((expiration = commands[1].match(/\d{2}\/\d{2}/)) != null)
  {
    console.log('登録処理を実施');
    register(foodstuff, expiration).then(function(value) {
      message = foodstuff + 'の期限を' + expiration + 'で登録したよ。';
      callback(err, message);
    }).catch(function(error) {
      console.log("Error: " + error);
      message = error;
      callback(err, message);
    });
  }
  // 消費
  else if (commands[1] == '食べた') {
    consume(foodstuff).then(function(value) {
      message = foodstuff + 'を食材から削除したよ。';
      callback(err, message);
    }).catch(function(error) {
      console.log("Error: " + error);
      message = error;
      callback(err, message);
    });
  }
  else {
    err = '書式エラー';
    callback(err, message);
  }
}

// APIに登録処理をリクエスト
function register(name, expiration) {
  console.log('request.params: { name: '  + name + ', expiration:' + expiration + ' }');
  let uri = apiHost + 'dishes';
  return new Promise(function(resolve, reject) {
    let options = {
      method: 'POST',
      uri: uri,
      body: {
        name: name,
        expiration: expiration,
      },
      json: true,
      headers: {
        'content-type': 'application/json',
      }
    };
    requestPromise(options).then(function(body) {
      resolve("Success.");
    })
    .catch(function(err) {
      reject("Error." + err);
    });
  });
};

// APIに参照処理をリクエスト
function refer(name) {
  console.log('request.params: { name: '  + name + ' }');
  let uri = apiHost + 'dishes/' + encodeURIComponent(name);
  return new Promise(function(resolve, reject){
    jsonget(uri).then(function(json) {
        console.log(json);
        resolve(json[name]);
    }).catch(function(err) {
        console.log(err);
    });
  });
}

// APIに削除処理をリクエスト
function consume(name) {
  console.log('request.params: { name: '  + name + ' }');
  let uri = apiHost + 'dishes/' + encodeURIComponent(name);
  return new Promise(function(resolve, reject){
    let options = {
      method: 'DELETE',
      uri: uri,
      headers: {
        'content-type': 'application/json',
      }
    };
    requestPromise(options).then(function(body) {
      resolve("Success.");
    })
    .catch(function(err) {
      reject("Error." + err);
    });
  });
}


module.exports.execute = execute;
