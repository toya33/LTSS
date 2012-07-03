/*
 * �S�̗̂���Ƃ������A�J�E���g�_�E���̋@�\��http://www.pori2.net/js/timer/6.html���p�N���܂���
 * �v���O���X�o�[��http://www.html5.jp/library/progress.html
 */

var Timer1; // �^�C�}�[���i�[����ϐ��i�^�C�}�[ID�j
var min;
var sec;

var finish = null; // �I�����ɍĐ����鉹��
var alert = null; // �I��N���O�ɍĐ����鉹��
// var SeStartBtn = null;
// var SeResetBtn = null;

// ��ʓ_�ł�on(true)/off(false)
flg_pulsate = {
	    f: true,
	    get flg() {
	        return this.f;
	    },
	    set flg(flg) {
	        return this.f = Boolean(flg);
	    }
	}; 

//�@explode�ɂ���ʕ���(true)/�������(false)
flg_exp = {
	    f: false,
	    get flg() {
	        return this.f;
	    },
	    set flg(flg) {
	        return this.f = Boolean(flg);
	    }
	}; 


// �u���E�U���ƂɁA�Ή����Ă��鉹���t�@�C���̌`���ɉ����ď�����ς���(http://himaxoff.blog111.fc2.com/blog-entry-97.html������p)
try {
	audio = new Audio("");
	if (audio.canPlayType) {
		var canPlayOgg = ("" != audio.canPlayType("audio/ogg"));
		var canPlayMp3 = ("" != audio.canPlayType("audio/mpeg"));
		if (canPlayOgg) {
			// ogg���T�|�[�g���Ă���
			// finish = new Audio("se/tokigakita_01.ogg");
			finish = new Audio("se/b_035.ogg");
			alert = new Audio("se/hato.ogg");
			// SeStartBtn = new Audio("se/youistart_01.ogg");
			// SeResetBtn = new Audio("se/reset_01.ogg");
		} else if (canPlayMp3) {
			// mp3���T�|�[�g���Ă���
			// finish = new Audio("se/tokigakita_01.mp3");
			finish = new Audio("se/b_035.mp3");
			alert = new Audio("se/hato.mp3");
			// SeStartBtn = new Audio("se/youistart_01.mp3");
			// SeResetBtn = new Audio("se/reset_01.mp3");
		} else {
			throw "ogg��mp3���T�|�[�g���Ă��܂���";
		}
	} else {
		throw "canPlayType���\�b�h�����݂��܂���";
	}
} catch (e) {
	// HTML5 Audio���T�|�[�g���Ă��Ȃ���Η�O������
	audio = null;
}

// �����̃��[�h��Ɏ����ōĐ�����Ȃ��悤�ɐݒ�
finish.autoplay = false;
alert.autoplay = false;
// SeStartBtn.autoplay = false;
// SeResetBtn.autoplay = false;

// �����t�@�C���̃��[�h����
finish.onload = function() {};
alert.onload = function() {};
// SeStartBtn.onload = function() {};
// SeResetBtn.onload = function() {};

var progress_max = 0; // �v���O���X�o�[�̍ő�l���i�[
// �v���O���X�o�[�����\���̐ݒ�
var p = {
		width : 976,
};
var o = null;
window.onload = function() {
	o = new html5jp.progress("progress", p);
	o.draw();
};

// �J�E���g�_�E���֐���1000�~���b���ɌĂяo���֐�
function Start() {
	//SeStartBtn.play();
	
	min = document.getElementById("min").value;
	sec = document.getElementById("sec").value;

	if (min == ""){
		min = 0;
		document.getElementById("min").value = 0;
	}
	min = parseInt(min);

	if (sec == ""){
		sec = 0;
		document.getElementById("sec").value = 0;
	}
	sec = parseInt(sec);

	// �v���O���X�o�[�̍ő�l��ݒ�
	progress_max = min * 60 + sec;

	// ���͒l���������ꍇ�̂ݏ���
	if (progress_max > 0) {
		document.getElementById("start").disabled = true;
		document.getElementById("reset").disabled = true;

		// �J�E���g�_�E���p�t�H�[������͕s�ɂ���
		document.getElementById("min").readOnly = true;
		document.getElementById("sec").readOnly = true;

		// �J�E���g�_�E���N��
		Timer1 = setInterval("CountDown()", 1000);
	}
}

// �^�C�}�[��~�֐�
function Stop() {
	document.getElementById("start").disabled = false;
	document.getElementById("reset").disabled = false;
	clearInterval(Timer1);
	// �J�E���g�_�E���p�t�H�[������͉\�ɂ���
	document.getElementById("min").readOnly = false;
	document.getElementById("sec").readOnly = false;
	var p = {
		width : 976,
	};
	o = new html5jp.progress("progress", p);
	o.reset();
}

// �J�E���g�_�E���֐�
function CountDown() {
	min = document.getElementById("min").value;
	sec = document.getElementById("sec").value;
	
	min = parseInt(min);
	sec = parseInt(sec);

	TMWrite(min * 60 + sec - 1);
}

// �c�莞�Ԃ������o���֐�
function TMWrite(int) {
	int = parseInt(int);

	var to = progress_max - int;

	// �v���O���X�o�[
	p = {
		to : to,
		full : progress_max,
		animation : 0,
		width : 976,
		nd : 1
	};
	o = new html5jp.progress("progress", p);
	o.draw();

	if (int <= 0) {
		// �I�����ԂɂȂ������̏���
		finish.play();
		// ���Ԑ؂�̂���explode�ɂ���ʕ���
		$("> :eq(0)", document.getElementById("wrap")).toggle("explode");

		document.getElementById("min").value = "";
		document.getElementById("sec").value = "";
		clearInterval(Timer1);

		flg_exp.flg = true;
	} else {
		if (int <= 60) {
			// 1���O�ɂȂ������̏���
			if (int <= 1){
				// 1�b�O�ɂȂ����特��&�G�t�F�N�g��~
				alert.pause();
			}else if ((int % 2 == 0) && flg_pulsate.flg){
				// 2�b���ƂɎ��s
				$("#wrap").effect("pulsate");
				alert.play();
			}
			document.getElementById("effect_toggle").disabled = false;
		}
		
		// �c�蕪����int��60�Ŋ����Đ؂�̂Ă�
		document.getElementById("min").value = Math.floor(int / 60);
		// �c��b����int��60�Ŋ������]��
		document.getElementById("sec").value = int % 60;
	}
}

// �G�t�F�N�g�J�n/��~
function EffectBtn() {
	if (flg_pulsate.flg) {
		flg_pulsate.flg = false;
		alert.pause();
	} else {
		flg_pulsate.flg = true;
		alert.play();
	}
}

// �J�E���g�_�E���I����wrap���N���b�N���邱�Ƃŉ�ʂ�߂�
function hoReturn() {
	if (flg_exp.flg) {
		$("> :eq(0)", document.getElementById("wrap")).toggle("explode");
		flg_exp.flg = false;
	}
}

// ���Z�b�g�{�^��
function ResetBtn() {
	// SeResetBtn.play();
}
