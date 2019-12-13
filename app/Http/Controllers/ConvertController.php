<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use CloudConvert\Api;
use Illuminate\Support\Facades\Storage;
use App\Convert;

class ConvertController extends Controller
{
    public function index(Request $request)
    {
        //Validation
        $request->validate([
            'audio' => 'required|file|mimetypes:audio/*',
            'name' => 'required'
        ]);
        return false;
        $id= $request->user()->id;
        $name = $request->input('name');
        $file = $request->file('audio');
        $inputFormat = $file->getClientOriginalExtension();
        $outputFormat = 'mp3';
        //Save the original file.
        $path = $file->store("converter/{$id}");
        $originalPath = storage_path("app/{$path}");
        //Download folder
        Storage::makeDirectory("public/converter/{$id}");
        //Upload the file
        $downloadPath = storage_path("app/public/converter/{$id}/{$name}.{$outputFormat}");
        try {
            //Convert
            $this->convert($originalPath, $downloadPath, $inputFormat, $outputFormat);
            //Save to the database
            $object = $this->save($id, $file->getClientOriginalName(), "{$name}.{$outputFormat}");
            //Delete the original.
            Storage::delete($path);
            return response()->json([
                'success' => true,
                'data' => $object]);
        } catch (\Exception $e) {
            return response()->json(['success' => false]);
        }

        //Delete the original
    }

    public function list(Request $request)
    {
        $id= $request->user()->id;
        $downloads = Convert::where('user_id', '=', $id)->orderBy('id', 'DESC')->get();
        return response()->json($downloads);
    }

    public function download()
    {
        return Storage::download('converter/storage/app/converter/6/ujm.mp3');
    }



    private function convert($upload, $download, $inputFormat, $outputFormat = 'mp3')
    {
        $api = new Api("6BXPs6Kcn1ACbu80YqB5NuhgaErTj9TIBW72xSmoJJmUSyjRYs5RIWi9IpSUWqOK");
        $api->convert([
            "inputformat" => $inputFormat,
            "outputformat" => $outputFormat,
            "input" => "upload",
            "file" => fopen($upload, 'r'),
        ])
            ->wait()
            ->download($download);
    }

    private function save($user, $original, $download)
    {
        return Convert::create([
            'user_id' => $user,
            'original_name' => $original,
            'download_name' => $download
        ]);
    }
}
