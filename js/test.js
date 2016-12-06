//ストーリー
a = new Array();
//0:通常, 1:選択肢が1つ, 2: 東西南北上下, 3: 戦闘, 4: ゲームオーバー 
a[1] = [1,"故郷のガラスが丘でこの手紙と金貨を受け取ったあなたは、納屋から先祖伝来の古い武具を取り出し、ひとつひとつ念入りにあらため始めました。あなたはこれから長い冒険の旅へと乗り出すのです。",,2];
a[2] = [0,"あなたは我が家をあとに草原を抜けて北に進みます。まずキャメル街道に出なければなりません。三キロほど歩いたころ、誰かに声をかけられました。<br>「大将、どこへ行くの」<br>あたりを見回すと、数メートル先の草地の小さな穴からヌーが顔をのぞかせています。","バンパー退治に行くと答える",3,"おまえには関係ないと答える",4];
a[3] = [2,10,20,,40,50,60];
a[4] = [4,"あなたは気を失って浜辺に倒れていた。起き上がってみたものの名前も住んでいた場所さえも思い出せない。<br>",1];
/*a[4] = ["気がつくと亀の背中に乗っていた。<br>そしてなぜか海の中にいた。","亀の上にしっかりと座る","亀をひっくり返す","顔を洗う",10,-10,5];
a[5] = ["亀はどんどん海の底へと潜っていく。<br>しかし、暗くなるどころか、前方に光が見える。","光を見つめる","亀をひっくり返す","服を洗う",5,-5,10];
a[6] = ["そこは竜宮城と書かれた海底の宮殿であった。<br>わたしは亀の背中に乗ったままその中に案内された。","亀から降りる","亀の上に立つ","亀の背中で寝る",5,10,-5];
a[7] = ["竜宮城の広間に乙姫と名乗る女性がいた。<br>彼女は私が亀を助けたと思っているらしい。","「私が助けました」","「私は何もしていません」","「早く玉手箱をよこせ」",20,5,-10];
a[8] = ["乙姫様が玉手箱をくれた。けして開けてはならないという。","持って帰る","いらない","ここで開ける",10,0,-50];
a[9] = ["気がつくと私は砂浜に倒れていた。そして手元には玉手箱があった。","開ける","開けない","開ける",-20,20,-10];
*/


//初期設定
my_hp = 100; //HP
showPage(1); //はじめのページ表示
address_id=1;


//ストーリーと選択肢の表示
function showPage(address_id) {
	var page_type = a[address_id][0];  //項目タイプ。0なら普通
//    num_of_options = (a[address_id].length - 2)/2;
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
    s += "<a href='javascript:showPage(a[address_id][3])'>"
    s += a[address_id][3]
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
			s += "（<a href='javascript:showPage(a[address_id][i])'>"
			s += a[address_id][i]+"）</a>";
			first_direction++;
		}
	}
	s += "へ続いています。";
    document.getElementById("text_q").innerHTML= s;

}

function gameOver(address_id) {
    	restart = a[address_id][2];
		s = "ゲームオーバー<br>";
		s += a[address_id][1];
		s += "まだティルトが残っているなら新しいティルトに替えて、";
		s += "<a href='javascript:showPage(restart)'>" + restart;
		s += "</a>から再スタートしてください。もしこれが最後のティルトならゲームオーバーです。";
		document.getElementById("text_q").innerHTML = s;
}


function battlePage(address_id) {
	var s;
	s = "第" + (address_id + 1) + "話：";
	//HPの増減
	my_hp += a[address_id][num+num_of_options];
	//結果表示
	s += "HP";
	if (a[address_id][num+num_of_options] >= 0) s += "+";
	s += a[address_id][num+num_of_options];
	document.getElementById("text_a").innerHTML = s;
	
	//HPのチェック
	if (my_hp > 200) my_hp = 200; //上限を超えさせない
	if (my_hp <= 0) {
		game_over(); //ゲームオーバー
	} else {
		//次の問題を表示
		//address_id++;
		if (address_id < a.length) {
			showPage(address_id);
		} else {
			//終了
			if (my_hp > 150) {
				s = "玉手箱を開けてしまった。モクモクと煙が立ち上がる。<br>";
				s += "そして、煙が消えたとき目の前に乙姫様が現れた。<br>";
				s += "二人は末永く幸せにくらしましたとさ・・・";
			} else if (my_hp > 100) {
				s = "玉手箱を開けることはできなかった。<br>";
				s += "わたしは家に帰り、二度とその箱を開けることはなかった。<br>";
				s += "もう一度乙姫様に会いたいなぁ・・・";
			} else if (my_hp > 50) {
				s = "玉手箱を開けてしまった。モクモクと煙が立ち上がる。<br>";
				s += "そして、煙が消えたとき目の前に海亀が現れた。<br>";
				s += "もう竜宮城へは戻れないようだ。かわいそうに・・・";
			} else {
				s = "玉手箱を開けてしまった。モクモクと煙が立ち上がる。<br>";
				s += "そして、煙が消えたとき私は老人になっていた。<br>";
				s += "おしまい・・・";
			}
			document.getElementById("text_q").innerHTML = s;
			//次の選択肢
			s = "【<a href='javascript:history.back()'>前のページに戻る</a>】";
			s += "【<a href='javascript:setReady()'>同じ物語を最初から</a>】";
			s += "【<a href=''>次の物語に進む</a>】";
			document.getElementById("text_s").innerHTML = s;
		}
	}
}


