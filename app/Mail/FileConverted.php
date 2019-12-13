<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class FileConverted extends Mailable
{
    use Queueable, SerializesModels;

    private $upload;

    private $download;

    /**
     * Create a new message instance.
     *
     * @param $upload
     * @param $download
     */
    public function __construct($upload, $download)
    {
        $this->upload = $upload;
        $this->download = $download;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->markdown('emails.file.converted')
            ->with([
                'upload' => $this->upload,
                'download' => $this->download
            ]);
        ;
    }
}
