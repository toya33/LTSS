  // Search API�����[�h����
  google.load( 'search', '1' );
  
  console.log("p1");

  function OnLoad()
  {
      // �����R���g���[�����쐬����
      var searchControl = new google.search.SearchControl();

      // �����R���g���[���ɉ摜�����̃T�[�`���[��ǉ�����
      searchControl.addSearcher( new google.search.ImageSearch() );
	  
	  searchControl.setResultSetSize('large');
	  
	  var options = new GsearcherOptions();
	  options.setExpandMode(GSearchControl.EXPAND_MODE_OPEN);
	  searchControl.addSearcher(ws,options);

      // �����R���g���[����`�悷��
      searchControl.draw( document.getElementById( 'inner_main_img' ) );
	  
      // ���������s����
      searchControl.execute( 'sky' );
	  
  }
  
  // �h�L�������g�����[�h���ꂽ��ɌĂяo�����n���h���֐���o�^����
  google.setOnLoadCallback( OnLoad );