function randomImg(ImgArrLength){
	// �摜����
	var n = ImgArrLength;
	var index = [];
	
	if (document.traForm.transit1[0].checked){
		// �K���x��
		for ( var i = 0; i < n; i++) {
			index[i] = i;
		}
	}
	
	if (document.traForm.transit1[1].checked) {
		// �����_��

		// �P�`���܂ł̐�����z��arr�ɏ��Ԃɑ��
	    var arr = [];
	    for (var i = 0; i < n; i++){
	    	arr[i] = i;
	    }
	 
	    // �����_���ɕ��ёւ������ʂ�z��shuffledArr�ɑ��
	    // shuffledArr[i]���P�`���܂ł̐�������ёւ��������ɂȂ�
	    var shuffledArr = [];
	    for (var i = 0; i < n; i++){
	    	// ��������
	        var randomIndex = Math.floor(Math.random() * arr.length);
	        // �����o���ꂽ�z���shuffledArr��[0]���珇�ɓ���Ă���
	        shuffledArr[i] = arr[randomIndex];
	        // arr�z��̎g�����l���폜���Ď��̃��[�v�ւ܂킷�B
	        arr.splice(randomIndex,1);
	 
	        // ����������_������shuffledArr[i]���摜�̕\�����ɂ���
	        index[i] = shuffledArr[i];
	    }
	}
	
	return index;
}
