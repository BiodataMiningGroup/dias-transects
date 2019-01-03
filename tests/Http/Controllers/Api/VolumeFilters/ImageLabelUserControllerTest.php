<?php

namespace Biigle\Tests\Modules\Volumes\Http\Controllers\Api\VolumeFilters;

use ApiTestCase;
use Biigle\Tests\ImageTest;
use Biigle\Tests\ImageLabelTest;

class ImageLabelUserControllerTest extends ApiTestCase
{
    public function testIndex()
    {
        $vid = $this->volume()->id;

        $image = ImageTest::create(['volume_id' => $vid]);
        $label = ImageLabelTest::create([
            'image_id' => $image->id,
            'user_id' => $this->editor()->id,
        ]);
        $uid = $this->editor()->id;

        // this image shouldn't appear
        $image2 = ImageTest::create(['volume_id' => $vid, 'filename' => 'b.jpg']);
        $label = ImageLabelTest::create([
            'image_id' => $image->id,
            'user_id' => $this->admin()->id,
        ]);

        $this->doTestApiRoute('GET', "/api/v1/volumes/{$vid}/images/filter/image-label-user/{$uid}");

        $this->beUser();
        $response = $this->get("/api/v1/volumes/{$vid}/images/filter/image-label-user/{$uid}");
        $response->assertStatus(403);

        $this->beGuest();
        $this->get("/api/v1/volumes/{$vid}/images/filter/image-label-user/{$uid}")
            ->assertStatus(200)
            ->assertExactJson([$image->id]);
    }
}
