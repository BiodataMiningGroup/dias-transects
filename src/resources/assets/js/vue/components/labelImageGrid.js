/**
 * A variant of the image grid used to display vomule images
 *
 * @type {Object}
 */
biigle.$component('volumes.components.labelImageGrid', {
    mixins: [biigle.$require('volumes.components.imageGrid')],
    template: '<div class="image-grid" @wheel.prevent="scroll">' +
        '<div class="image-grid__images" ref="images">' +
            '<image-grid-image v-for="image in displayedImages" :key="image.id" :image="image" :empty-url="emptyUrl" :selected-label="selectedLabel" @select="emitSelect" @deselect="emitDeselect"></image-grid-image>' +
        '</div>' +
        '<image-grid-progress v-if="canScroll" :progress="progress" @top="jumpToStart" @prev-page="reversePage" @prev-row="reverseRow" @jump="jumpToPercent" @next-row="advanceRow" @next-page="advancePage" @bottom="jumpToEnd"></image-grid-progress>' +
    '</div>',
    components: {
        imageGridImage: biigle.$require('volumes.components.labelImageGridImage'),
    },
    data: function () {
        return {
            selectedLabel: null,
        };
    },
    created: function () {
        var self = this;
        biigle.$require('volumes.events').$on('labels.select', function (label) {
            self.selectedLabel = label;
        });

        biigle.$require('volumes.events').$on('labels.deselect', function (label) {
            self.selectedLabel = null;
        });
    }
});
