//ストーリー
a = new Array();
//0:通常, 1:選択肢が1つ, 2: 東西南北上下
//3: 戦闘(攻撃ポイント,体力,ダメージ) 4: ゲームオーバー 
a[1] = [1,"故郷のガラスが丘でこの手紙と金貨を受け取ったあなたは、納屋から先祖伝来の古い武具を取り出し、ひとつひとつ念入りにあらため始めました。あなたはこれから長い冒険の旅へと乗り出すのです。",2];
a[2] = [0,"あなたは我が家をあとに草原を抜けて北に進みます。まずキャメル街道に出なければなりません。三キロほど歩いたころ、誰かに声をかけられました。<br>「大将、どこへ行くの」<br>あたりを見回すと、数メートル先の草地の小さな穴からヌーが顔をのぞかせています。","バンパー退治に行くと答える",3,"おまえには関係ないと答える",4];
a[3] = [2,1,2,4,3,5,60];
a[4] = [4,"あなたは気を失って浜辺に倒れていた。起き上がってみたものの名前も住んでいた場所さえも思い出せない。<br>",1];
a[5] = [3,"土竜",1,12,3,393,40];
/*a[6] = ["そこは竜宮城と書かれた海底の宮殿であった。<br>わたしは亀の背中に乗ったままその中に案内された。","亀から降りる","亀の上に立つ","亀の背中で寝る",5,10,-5];
a[7] = ["竜宮城の広間に乙姫と名乗る女性がいた。<br>彼女は私が亀を助けたと思っているらしい。","「私が助けました」","「私は何もしていません」","「早く玉手箱をよこせ」",20,5,-10];
a[8] = ["乙姫様が玉手箱をくれた。けして開けてはならないという。","持って帰る","いらない","ここで開ける",10,0,-50];
a[9] = ["気がつくと私は砂浜に倒れていた。そして手元には玉手箱があった。","開ける","開けない","開ける",-20,20,-10];
*/


//初期設定
my_hp = 100; //HP
address_id = localStorage.address_id;
//address_id = 1;
if (address_id=="" || address_id=="undefined") {
	address_id=1;
}
showPage(address_id); 



//ストーリーと選択肢の表示
function showPage(address_id) {
	localStorage.address_id = address_id;
	var page_type = a[address_id][0];  //項目タイプ。
    //番地表示
    document.getElementById("address").innerHTML =  (address_id) + "：HP" + my_hp + "<br>";
    document.getElementById("text_s").innerHTML = "";

    switch(page_type){
    case 0:
    	showNormalPage(address_id);
		break;
	case 1:
	    showSingleOption(address_id);
	    break;
	case 2:
	    showDungeon(address_id);
	    break;
	case 3:
		battlePage(address_id);
		break;
    case 4:
    	gameOver(address_id);
		break;
	}
}



function showNormalPage(address_id) {
	document.getElementById("text_q").innerHTML = a[address_id][1]; 
	//選択肢
	var s = "";
	for (i=2;i<=a[address_id].length-1;i+=2) {
		if (a[address_id][i] != "") {
			s +=  a[address_id][i];
			s += "　　" + "<span class='option_address'>";
			s += "<a href='javascript:showPage(" + a[address_id][i+1] + ")'>"
			s += a[address_id][i+1];
			s += "へ進む。</a></span><br />";
		}
	}
	document.getElementById("text_s").innerHTML = s;
}

function showSingleOption(address_id) {
	var s = a[address_id][1];
    s += "<a href='javascript:showPage("
    s += a[address_id][2];
    s += ")'>";
    s += a[address_id][2];
    s += "へ進む。</a>";
    document.getElementById("text_q").innerHTML= s;
}

function showDungeon(address_id) {
	//ストーリー
	var direction =["","東","西","南","北","上","下"];
	var s = "通路は";
	var first_direction = 0;
	for (i = 1; i < a[address_id].length; i++) {
		if (a[address_id][i]){
			if (first_direction != 0){
				s +="、";
			}
			s += direction[i];
			s += "（<a href='javascript:showPage(";
			s += a[address_id][i];
			s += ")'>"
			s += a[address_id][i] + "）</a>";
			first_direction++;
		}
	}
	s += "へ続いています。";
    document.getElementById("text_q").innerHTML= s;

}

function gameOver(address_id) {
    	var restart = a[address_id][2];
		var s = "ゲームオーバー<br>";
		s += a[address_id][1];
		s += "まだティルトが残っているなら新しいティルトに替えて、";
		s += "<a href='javascript:showPage(";
		s += restart;
		s+=")'>" + restart;
		s += "</a>から再スタートしてください。もしこれが最後のティルトならゲームオーバーです。";
		document.getElementById("text_q").innerHTML = s;
}


function battlePage(address_id) {
	var s = "<a href='javascript:showPage(1)'>1</a>へ戻る";
	document.getElementById("text_q").innerHTML = s;
}


