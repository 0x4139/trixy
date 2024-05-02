<script>
    import { onMount, onDestroy } from 'svelte';
    import { setPageTitle } from '$lib/utils';
    import { appOptions } from '/src/stores/appOptions.js';
    import Card from '/src/components/bootstrap/Card.svelte';
    import PerfectScrollbar from '/src/components/plugins/PerfectScrollbar.svelte';
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';



    onMount(async () => {
        setPageTitle('Contact Us');


        let quill = await import('quill');
        new quill.default('#quillEditor', {
            theme: 'snow'
        });

        $appOptions.appContentClass = 'p-3';
        $appOptions.appContentFullHeight = true;
    });

    onDestroy(() => {
        $appOptions.appContentClass = '';
        $appOptions.appContentFullHeight = false;
    });
</script>

<!-- BEGIN card -->
<ul class="breadcrumb">
    <li class="breadcrumb-item"><a href="#/">TRIXY</a></li>
    <li class="breadcrumb-item active">CONTACT US</li>
</ul>
<h1 class="page-header">Contact Us <small> or not</small></h1>
<hr class="mb-5">
<Card>

    <!-- BEGIN mailbox -->
    <div class="mailbox">
        <!-- BEGIN mailbox-toolbar -->
        <div class="mailbox-toolbar">
            <div class="mailbox-toolbar-item"><span class="mailbox-toolbar-text">New Message</span></div>
            <div class="mailbox-toolbar-item ms-auto"><a href="/contact-us" class="mailbox-toolbar-link"><i class="fa fa-redo fa-fw fs-12px me-1"></i> Undo</a></div>
            <div class="mailbox-toolbar-item"><a href="/contact-us" class="mailbox-toolbar-link"><i class="fa fa-times fa-fw"></i> Cancel</a></div>
        </div>
        <!-- END mailbox-toolbar -->
        <!-- BEGIN mailbox-body -->
        <div class="mailbox-body">
            <div class="mailbox-content">
                <form action="#/" method="POST" name="email_form" class="h-100">
                    <!-- BEGIN scrollbar -->
                    <PerfectScrollbar>
                        <div class="mailbox-form d-flex flex-column h-100">
                            <div class="mailbox-form-header">
                                <div class="row mb-2">
                                    <label class="col-form-label w-100px px-2 fw-500 text-lg-end" for="to">To:</label>
                                    <div class="col-lg">
                                        <input style="letter-spacing: 1px;" type="email" disabled class="form-control" placeholder="office@trixy.ai" id="subject" />
                                    </div>
                                </div>
                                <div class="row mb-0">
                                    <label class="col-form-label w-100px px-2 fw-500 text-lg-end" for="subject">Subject:</label>
                                    <div class="col-lg">
                                        <input type="text" class="form-control" placeholder="Email subject" id="subject" />
                                    </div>
                                </div>
                            </div>
                            <div class="border-0">
                                <div id="quillEditor" style=" min-height: 50vh;"></div>
                            </div>
                        </div>
                    </PerfectScrollbar>
                    <!-- END scrollbar -->
                </form>
            </div>
        </div>
        <!-- END mailbox-body -->
    </div>
    <!-- END mailbox -->
</Card>
<!-- END card -->
