<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use CloudConvert\Api;
use Illuminate\Support\Facades\Storage;

class ConvertController extends Controller
{
    public function index(Request $request)
    {
        //Validation
        $request->validate([
            'audio' => 'required|file|mimetypes:audio/*',
            'name' => 'required'
        ]);
        $id= $request->user()->id;
        $name = $request->input('name');
        $file = $request->file('audio');
        $inputFormat = $file->getClientOriginalExtension();
        $outputFormat = 'mp3';
        //Save the original file.
        $path = $file->store("converter/{$id}");
        $originalPath = storage_path("app/{$path}");
        //Upload the file
        $downloadPath = storage_path("app/converter/{$id}/{$name}.{$outputFormat}");
        try {
            //Convert
            $this->convert($originalPath, $downloadPath, $inputFormat, $outputFormat);
            //Delete the original.
            Storage::delete($path);
            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['success' => false]);
        }

        //Delete the original
    }

    public function list()
    {
        return response()->json(json_encode(['page' => 'list']));
    }

    public function download()
    {
        return Storage::download('converter/1/shantha.mp3');
    }



    private function convert($upload, $download, $inputFormat, $outputFormat = 'mp3')
    {
        $api = new Api("6BXPs6Kcn1ACbu80YqB5NuhgaErTj9TIBW72xSmoJJmUSyjRYs5RIWi9IpSUWqOK");
        $x = $api->convert([
            "inputformat" => $inputFormat,
            "outputformat" => $outputFormat,
            "input" => "upload",
            "file" => fopen($upload, 'r'),
        ])
            ->wait()
            ->download($download);
        $x;
    }
}
