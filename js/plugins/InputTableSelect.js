//=============================================================================
// InputTableSelect.js
//=============================================================================

/*:ja
 * @plugindesc ver1.00 変数の値によって名前入力用の
 * 切り替え可能なテーブルに制限をかけます。
 * @author まっつＵＰ
 * 
 * @param select
 * @desc このIDの変数の値を処理に使います
 * （要ヘルプ参照）
 * @default 10
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * selectと同じIDの変数の値が
 * ・1 JAPAN1
 * ・2 JAPAN2
 * ・3 JAPAN3
 * ・4 JAPAN1,JAPAN2
 * ・5 JAPAN1,JAPAN3
 * ・6 JAPAN2,JAPAN3
 * ・これら以外　デフォルト
 * 
 * 日本語以外には非対応なので注意してください。
 * 
 * このプラグインを利用する場合は
 * readmeなどに「まっつＵＰ」の名を入れてください。
 * また、素材のみの販売はダメです。
 * 上記以外の規約等はございません。
 * もちろんツクールMVで使用する前提です。
 * 何か不具合ありましたら気軽にどうぞ。
 *  
 * 免責事項：
 * このプラグインを利用したことによるいかなる損害も制作者は一切の責任を負いません。
 * 
 */

(function() {
    
var parameters = PluginManager.parameters('InputTableSelect');
var ITSselect = Number(parameters['select'] || 10);

var _Window_NameInput_table = Window_NameInput.prototype.table;
Window_NameInput.prototype.table = function() {
    var ITSval = $gameVariables.value(ITSselect);
    var array = [];
    if(this.isdefaulttable(ITSval)){
        return _Window_NameInput_table.call(this);
    } 
    if(ITSval === 1 || ITSval === 4 || ITSval === 5){
        array.push(Window_NameInput.JAPAN1);
    }
    if(ITSval === 2 || ITSval === 4 || ITSval === 6){
        array.push(Window_NameInput.JAPAN2);
    }
    if(ITSval === 3 || ITSval === 5 || ITSval === 6){
        array.push(Window_NameInput.JAPAN3);
    }
    return array;
};

var _Window_NameInput_refresh = Window_NameInput.prototype.refresh
Window_NameInput.prototype.refresh = function() {
    var ITSval = $gameVariables.value(ITSselect);
    if(this.isdefaulttable(ITSval)){
        _Window_NameInput_refresh.call(this);
    }else{
        var table = this.table();
        var ITStext = this.changeTable(ITSval);
        this.contents.clear();
        this.resetTextColor();
        for(var i = 0; i < 90; i++){
            var rect = this.itemRect(i);
            if(i === 88){
                var text = ITStext;
            }else{
                var text = table[this._page][i];
            }
            rect.x += 3;
            rect.width -= 6;
            this.drawText(text, rect.x, rect.y, rect.width, 'center');
        }
    }
};

Window_NameInput.prototype.isdefaulttable = function(ITSval) {
    return !$gameSystem.isJapanese() || ITSval <= 0 || ITSval > 6;
};

Window_NameInput.prototype.changeTable = function(ITSval) {
    var table = _Window_NameInput_table.call(this);
    var num = 88;
    if(ITSval < 4){
        var text = '';
    }else{
        var text = this.table()[this._page][num];
    }
    if(ITSval === 4 && this._page === 1){
        text = table[2][num];
    }
    if(ITSval === 5 && this._page === 0){
        text = table[1][num];
    }
    if(ITSval === 6 && this._page === 1){
        text = table[0][num];
    }
    return text;
};

})();
