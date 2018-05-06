// コマンドを受取りアクションを実行
var execute = function(commands, callback) {
  let message = '';
  let err = null;
  foodstuff = commands[0];
  // 食べ物名のみ
  if(commands.length < 2) 
  {
    message = foodstuff + 'の期限はYYYYMMDDだよ。';
  }
  // 日付指定
  else if ((expiration = commands[1].match(/\d{2}\/\d{2}/)) != null)
  {
    message = foodstuff + 'の期限を' + expiration + 'で登録したよ。';
  }
  // 消費
  else if (commands[1] == '食べた') {
    consume(foodstuff);
    message = foodstuff + 'を食材から削除したよ。';
  }
  else {
    err = '書式エラー';
  }
  callback(err, message);
}

// APIに登録処理をリクエスト
var register = new Promise(function(name, expiration) {
  // TODO
  resolve(expiration);
});

// APIに参照処理をリクエスト
function refer(name) {
  // TODO
}

// APIに削除処理をリクエスト
function consume(name) {
  // TODO
}


module.exports.execute = execute;
