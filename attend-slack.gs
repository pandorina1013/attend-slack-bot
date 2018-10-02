function post_slack() {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN')
  var slackApp = SlackApp.create(token); 
  SpreadsheetApp.getActive().getSheetByName('shname')

  slackApp.chatPostMessage(
    'channelname'
    ,'hogehoge'
    ,{
      "icon_emoji" :':sunglasses:'
      ,"username": 'xxxxxx'
    }
  );
}

function onEdit(e) {
  SpreadsheetApp.getActive().getSheetByName('shname').appendRow([
    new Date(),
    e.user.getEmail(),
    e.value
  ]);
}

function check_dbd(){
  var sh = SpreadsheetApp.getActive().getSheetByName('shname')
  var last_edit = sh.getLastRow();
  var date = new Date();
  if(date-sh.getRange(last_edit,1).getValue() < 86400000){
    post_slack()
  }
}
