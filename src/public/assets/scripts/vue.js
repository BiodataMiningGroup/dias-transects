biigle.$viewModel("transect-dashboard-hot-box-right",function(e){new Vue({el:e,components:{transectThumbnail:biigle.$require("projects.components.transectThumbnail")}})}),biigle.$viewModel("transect-metadata-upload",function(e){var i=biigle.$require("messages.store"),a=biigle.$require("api.transectImageMetadata"),t=biigle.$require("transects.id");new Vue({el:e,data:{loading:!1,csv:void 0,error:!1,success:!1,message:void 0},methods:{handleSuccess:function(){this.error=!1,this.success=!0},handleError:function(e){this.success=!1,e.data.file?Array.isArray(e.data.file)?this.error=e.data.file[0]:this.error=e.data.file:i.handleErrorResponse(e)},submit:function(e){if(this.csv){this.loading=!0;var i=new FormData;i.append("file",this.csv),a.save({id:t},i).bind(this).then(this.handleSuccess,this.handleError).finally(function(){this.loading=!1})}},setCsv:function(e){this.csv=e.target.files[0]}}})}),biigle.$declare("api.transectImageMetadata",Vue.resource("/api/v1/transects{/id}/images/metadata"));