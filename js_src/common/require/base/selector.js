
/**
 * ȡ�ö���
 * @param exp ������ʽ���������������͵Ĳ���
 * 		1. String���͵Ķ���ѡ����ʽ
 * 		2. ԭ������
 * 		3. �Ѿ���װ���Ķ���
 */
var $ = function(exp) {
	
	//	������ʽΪ�ַ������Ǿ����ҵ�ԭ������
	if (typeof(exp) == 'string') {
		switch (exp.charAt(0)) {
			case '#':		//	��ʾ��ͨ��idȡֵ
				exp = document.getElementById(exp.substr(1));
				break;
		}
	}
	
	//	�ж϶����Ƿ񱻰�װ���������װ�����Ǿͷ��ص�ǰ������������û���Ǿͷ��ر���װ���Ķ�������ֻ������IE������µ�ԭ������
	return exp.attr ? exp : $.Element.pack(exp);
}