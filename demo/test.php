<?php 
	if( !isset($_GET['id']) ){
 		echo '{"name":"vt_test_zxj3_3","version":"1.1","nodes":{"1":{"id":"1","type":"Start","out":["3"]},"2":{"id":"2","type":"End"},"3":{"id":"3","type":"ParallelSplit","string":"ParallelSplit","out":["4","8"]},"4":{"id":"4","type":"Action","string":"test1","urls":{"\u67e5\u770b\u4f9d\u8d56\u5173\u7cfb\u56fe":"\/data\/index.php?r=workflow\/relygraph&activity_name=test1&workflow_id=96","\u8df3\u8f6c\u5230\u6d3b\u52a8":"\/data\/index.php?r=activity\/index&activity_name=test1","\u8df3\u8f6c\u5230\u4f5c\u4e1a":"\/data\/index.php?r=job\/index&workflow_name=vt_test_zxj3_3","\u8df3\u8f6c\u5230\u4efb\u52a1":"\/data\/index.php?r=task\/index&workflow_name=vt_test_zxj3_3"},"out":["5"]},"5":{"id":"5","type":"Synchronization","string":"Synchronization","out":["6"]},"6":{"id":"6","type":"Action","string":"test_1","urls":{"\u67e5\u770b\u4f9d\u8d56\u5173\u7cfb\u56fe":"\/data\/index.php?r=workflow\/relygraph&activity_name=test_1&workflow_id=96","\u8df3\u8f6c\u5230\u6d3b\u52a8":"\/data\/index.php?r=activity\/index&activity_name=test_1","\u8df3\u8f6c\u5230\u4f5c\u4e1a":"\/data\/index.php?r=job\/index&workflow_name=vt_test_zxj3_3","\u8df3\u8f6c\u5230\u4efb\u52a1":"\/data\/index.php?r=task\/index&workflow_name=vt_test_zxj3_3"},"out":["7"]},"7":{"id":"7","type":"Action","string":"test_2","urls":{"\u67e5\u770b\u4f9d\u8d56\u5173\u7cfb\u56fe":"\/data\/index.php?r=workflow\/relygraph&activity_name=test_2&workflow_id=96","\u8df3\u8f6c\u5230\u6d3b\u52a8":"\/data\/index.php?r=activity\/index&activity_name=test_2","\u8df3\u8f6c\u5230\u4f5c\u4e1a":"\/data\/index.php?r=job\/index&workflow_name=vt_test_zxj3_3","\u8df3\u8f6c\u5230\u4efb\u52a1":"\/data\/index.php?r=task\/index&workflow_name=vt_test_zxj3_3"},"out":["2"]},"8":{"id":"8","type":"Action","string":"test2","urls":{"\u67e5\u770b\u4f9d\u8d56\u5173\u7cfb\u56fe":"\/data\/index.php?r=workflow\/relygraph&activity_name=test2&workflow_id=96","\u8df3\u8f6c\u5230\u6d3b\u52a8":"\/data\/index.php?r=activity\/index&activity_name=test2","\u8df3\u8f6c\u5230\u4f5c\u4e1a":"\/data\/index.php?r=job\/index&workflow_name=vt_test_zxj3_3","\u8df3\u8f6c\u5230\u4efb\u52a1":"\/data\/index.php?r=task\/index&workflow_name=vt_test_zxj3_3"},"out":["5"]},"length":8}}';
 	}else if($_GET['id'] == 1) {
	 	echo '{"name":"rely graph","nodes":{"1":{"id":1,"string":"senstive_word_find","type":"Action","style":{"font-weight":"bold","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[4]},"2":{"id":2,"string":"\u8ba1\u7b97\u8f93\u51fa:recmid_query_merge","type":"Input","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[1]},"3":{"id":3,"string":"\u4f9d\u8d56\u6587\u4ef6:queryfilter_dict","type":"Input","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[1]},"4":{"id":4,"string":"\u8ba1\u7b97\u8f93\u51fa:senstive_word_find","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[6,7]},"5":{"id":5,"string":"recmid_query_merge","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[2]},"8":{"id":8,"string":"\u8ba1\u7b97\u8f93\u51fa:recmid_query_daystats","type":"Input","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[5]},"9":{"id":9,"string":"recmid_query_daystats","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[8]},"10":{"id":10,"string":"\u8ba1\u7b97\u8f93\u51fa:recmid_query","type":"Input","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[9]},"11":{"id":11,"string":"recmid_query","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[10]},"12":{"id":12,"string":"\u539f\u59cb\u65e5\u5fd7:v2token_filter","type":"Input","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[11]},"13":{"id":13,"string":"\u8ba1\u7b97\u8f93\u51fa:v2token_discard_filter","type":"Input","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[11]},"14":{"id":14,"string":"v2token_discard_filter","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[13]},"15":{"id":15,"string":"\u539f\u59cb\u65e5\u5fd7:v2token_discard","type":"Input","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[14]},"6":{"id":6,"string":"recmid_query_join","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[16]},"16":{"id":16,"string":"\u8ba1\u7b97\u8f93\u51fa:recmid_query_join","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[17]},"17":{"id":17,"string":"recmid_query_sort","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[18]},"18":{"id":18,"string":"\u8ba1\u7b97\u8f93\u51fa:recmid_query_sort","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[19,20]},"19":{"id":19,"string":"query_rec_expand_merge_link","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[21]},"21":{"id":21,"string":"\u8ba1\u7b97\u8f93\u51fa:query_rec_expand_merge_link","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[22]},"22":{"id":22,"string":"query_rec_expand_merge_huid","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[23]},"23":{"id":23,"string":"\u8ba1\u7b97\u8f93\u51fa:query_rec_expand_merge_huid","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[24,25,26,27,28]},"24":{"id":24,"string":"recmid_query_select","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[29]},"29":{"id":29,"string":"\u8ba1\u7b97\u8f93\u51fa:recmid_query_select","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"}},"25":{"id":25,"string":"QR_query_pb","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[30]},"30":{"id":30,"string":"\u8ba1\u7b97\u8f93\u51fa:QR_pb","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[31]},"31":{"id":31,"string":"QR_pb_move","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"}},"26":{"id":26,"string":"query_rec_with_cf","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[32]},"32":{"id":32,"string":"\u8ba1\u7b97\u8f93\u51fa:query_rec_with_cf","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[33]},"33":{"id":33,"string":"query_rec_expand_merge_cf","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[34]},"34":{"id":34,"string":"\u8ba1\u7b97\u8f93\u51fa:query_rec_expand_merge_cf","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"}},"27":{"id":27,"string":"cf_word_valid_filter","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[35]},"35":{"id":35,"string":"\u8ba1\u7b97\u8f93\u51fa:cf_word_valid_filter","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[36]},"36":{"id":36,"string":"cf_word_valid_filter_cp","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"}},"28":{"id":28,"string":"QR_qrec_stat","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[37]},"37":{"id":37,"string":"\u8ba1\u7b97\u8f93\u51fa:QR_stats","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"}},"20":{"id":20,"string":"recids_query2entityid","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[38]},"38":{"id":38,"string":"\u8ba1\u7b97\u8f93\u51fa:recids_query2entityid","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"}},"7":{"id":7,"string":"senstive_word_filter","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[39]},"39":{"id":39,"string":"\u8ba1\u7b97\u8f93\u51fa:senstive_word_filter","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"}}}}';
   }else if($_GET['id'] == 2) {
	 	echo '{"name":"rely graph","nodes":{"1":{"id":1,"string":"output_qry_pair_raw","type":"Action","style":{"font-weight":"bold","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[3]},"2":{"id":2,"string":"\u8ba1\u7b97\u8f93\u51fa:extracted_search_log","type":"Input","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[1]},"3":{"id":3,"string":"\u8ba1\u7b97\u8f93\u51fa:qry_pair_raw","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[5]},"4":{"id":4,"string":"extract_search_log","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[2]},"6":{"id":6,"string":"\u539f\u59cb\u65e5\u5fd7:v2token_filter","type":"Input","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[4]},"7":{"id":7,"string":"\u539f\u59cb\u65e5\u5fd7:v2token_filter_out","type":"Input","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[4]},"8":{"id":8,"string":"\u539f\u59cb\u65e5\u5fd7:v2token_filter_other","type":"Input","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[4]},"5":{"id":5,"string":"qry_pair_cnt","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[9]},"9":{"id":9,"string":"\u8ba1\u7b97\u8f93\u51fa:qry_pair_cnt","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[10]},"10":{"id":10,"string":"left_half_join_qry","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[11]},"11":{"id":11,"string":"\u8ba1\u7b97\u8f93\u51fa:left_half_join_qry","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[12]},"12":{"id":12,"string":"right_half_join_qry","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[13]},"13":{"id":13,"string":"\u8ba1\u7b97\u8f93\u51fa:right_half_join_qry","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[14]},"14":{"id":14,"string":"recm_qry","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[15]},"15":{"id":15,"string":"\u8ba1\u7b97\u8f93\u51fa:recm_qry","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[16]},"16":{"id":16,"string":"recm_qry_avg","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[17]},"17":{"id":17,"string":"\u8ba1\u7b97\u8f93\u51fa:recm_qry_avg","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[18,20,21,23]},"18":{"id":18,"string":"query_rec_senstive_word_find","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[22]},"22":{"id":22,"string":"\u8ba1\u7b97\u8f93\u51fa:query_rec_senstive_word_find","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[23]},"23":{"id":23,"string":"query_rec_senstive_word_filter","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[24]},"24":{"id":24,"string":"\u8ba1\u7b97\u8f93\u51fa:query_rec_senstive_word_filter","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"}},"20":{"id":20,"string":"query_rec_queryfilter","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[25]},"25":{"id":25,"string":"\u8ba1\u7b97\u8f93\u51fa:query_rec_queryfilter","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[26,27]},"26":{"id":26,"string":"query_rec_expand_top","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[28]},"28":{"id":28,"string":"\u8ba1\u7b97\u8f93\u51fa:query_rec_expand_top","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[29]},"29":{"id":29,"string":"query_cf_url_append","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[30]},"30":{"id":30,"string":"\u8ba1\u7b97\u8f93\u51fa:liuxiaohui_query_cf_url_append","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[31]},"31":{"id":31,"string":"cf_merge_url","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[32]},"32":{"id":32,"string":"\u8ba1\u7b97\u8f93\u51fa:cf_merge_url","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[33,34,35]},"33":{"id":33,"string":"query_rec_with_cf","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[36]},"36":{"id":36,"string":"\u8ba1\u7b97\u8f93\u51fa:query_rec_with_cf","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[37]},"37":{"id":37,"string":"query_rec_expand_merge_cf","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[38]},"38":{"id":38,"string":"\u8ba1\u7b97\u8f93\u51fa:query_rec_expand_merge_cf","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"}},"34":{"id":34,"string":"cf_big_kw","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[39]},"39":{"id":39,"string":"\u8ba1\u7b97\u8f93\u51fa:cf_big_kw","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[37]},"35":{"id":35,"string":"cf_word_valid_filter","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[40]},"40":{"id":40,"string":"\u8ba1\u7b97\u8f93\u51fa:cf_word_valid_filter","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[41]},"41":{"id":41,"string":"cf_word_valid_filter_cp","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"}},"27":{"id":27,"string":"output_recm_qry","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[42]},"42":{"id":42,"string":"\u8ba1\u7b97\u8f93\u51fa:output_recm_qry","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[43]},"43":{"id":43,"string":"access_recm_qry","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"}},"21":{"id":21,"string":"acc_recm_qry","type":"Action","style":{"font-weight":"","background-color":"lightskyblue"},"urls":{"\u8df3\u8f6c\u5230\u4f5c\u4e1a":"www.baidu.com","\u8df3\u8f6c\u5230\u6d3b\u52a8":"www.so.com"},"out":[44]},"44":{"id":44,"string":"\u8ba1\u7b97\u8f93\u51fa:acc_recm_qry","type":"Output","style":[],"urls":{"\u8df3\u8f6c\u5230\u8d44\u6e90":"www.so.com"},"out":[21]}}}';
	}
?>