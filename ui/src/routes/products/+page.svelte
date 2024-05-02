<script>
    import {setPageTitle} from '$lib/utils';
    import {onMount} from 'svelte';
    import Icon from '@iconify/svelte';
    import Card from '/src/components/bootstrap/Card.svelte';
    import CardBody from '/src/components/bootstrap/CardBody.svelte';

    onMount(async () => {
        setPageTitle('Products');
    });
</script>

<ul class="breadcrumb">
    <li class="breadcrumb-item"><a href="#/">TRIXY</a></li>
    <li class="breadcrumb-item active">PRODUCTS</li>
</ul>

<h1 class="page-header">Trixy API <small>For Developers, Traders, Investors and Enterprises</small></h1>
<hr class="mb-5">

<Card>
    <div class="row gx-0">
        <div class="col-xl-7 position-relative">
            <div class="p-5">
                <div class="display-5 fw-bold mb-3">Real-Time Crypto Market Intelligence</div>
                <div class="fs-13px mb-4 font-monospace">
                    <ul class="list-unstyled">
                        <li class="mt-2">
                            The Trixy API provides developers and businesses with the power to integrate real-time
                            cryptocurrency market data and sentiment analysis directly into their applications.
                        </li>
                        <li class="mt-2">
                            Built on the robust CryptoPulse platform, which analyzes extensive data across over <b
                                class="text-theme d-inline-flex border-bottom border-1 border-gray-500">15,000</b>
                            crypto projects using advanced language models and blockchain technology.
                        </li>
                        <li class="mt-2">
                            Enhance your applications by offering dynamic insights, driving engagement, and providing
                            actionable market intelligence in an ever-evolving cryptocurrency landscape.
                        </li>

                    </ul>
                </div>
                <div class="row mb-n3">
                    <div class="col-lg-6">
                        <div class="d-flex align-items-center mb-3">
                            <Icon class="iconify fs-30px text-theme" icon="bi:graph-up-arrow"/>
                            <div class="flex-1 ps-2 fs-13px fw-bold">
                                Real-Time Sentiment Analysis
                            </div>
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <Icon class="iconify fs-30px text-theme" icon="mdi:brain"/>
                            <div class="flex-1 ps-2 fs-13px fw-bold">
                                Predictive Sentiment Modeling
                            </div>
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <Icon class="iconify fs-30px text-theme" icon="fa-solid:hashtag"/>
                            <div class="flex-1 ps-2 fs-13px fw-bold">
                                Trending Topics Detection
                            </div>
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <Icon class="iconify fs-30px text-theme" icon="ic:outline-emoji-people"/>
                            <div class="flex-1 ps-2 fs-13px fw-bold">
                                Key Influencer Identification
                            </div>
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <Icon class="iconify fs-30px text-theme" icon="bi:journal-code"/>
                            <div class="flex-1 ps-2 fs-13px fw-bold">
                                Comprehensive API Documentation
                            </div>
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <Icon class="iconify fs-30px text-theme" icon="carbon:security"/>
                            <div class="flex-1 ps-2 fs-13px fw-bold">
                                Enhanced Security Features
                            </div>
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <Icon class="iconify fs-30px text-theme" icon="fa-solid:money-bill-wave"/>
                            <div class="flex-1 ps-2 fs-13px fw-bold">
                                Money-Back Guarantee
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="d-flex align-items-center mb-3">
                            <Icon class="iconify fs-30px text-theme" icon="mdi:account-group-outline"/>
                            <div class="flex-1 ps-2 fs-13px fw-bold">
                                Community Engagement Metrics
                            </div>
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <Icon class="iconify fs-30px text-theme" icon="mdi:candle"/>
                            <div class="flex-1 ps-2 fs-13px fw-bold">
                                Candlestick Pattern Recognition
                            </div>
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <Icon class="iconify fs-30px text-theme" icon="ic:baseline-category"/>
                            <div class="flex-1 ps-2 fs-13px fw-bold">
                                Automated Content Classification
                            </div>
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <Icon class="iconify fs-30px text-theme" icon="carbon:event"/>
                            <div class="flex-1 ps-2 fs-13px fw-bold">
                                Event Impact Analysis
                            </div>
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <Icon class="iconify fs-30px text-theme" icon="fluent:alert-24-regular"/>
                            <div class="flex-1 ps-2 fs-13px fw-bold">
                                Behavioral Alerts
                            </div>
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <Icon class="iconify fs-30px text-theme" icon="mdi:waveform"/>
                            <div class="flex-1 ps-2 fs-13px fw-bold">
                                Volatility Forecasts
                            </div>
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <Icon class="iconify fs-30px text-theme" icon="mdi:scale-balance"/>
                            <div class="flex-1 ps-2 fs-13px fw-bold">
                                Comparative Sentiment Analysis
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-5 d-xl-block d-none">
            <div class="ms-n5 h-100 d-flex align-items-center justify-content-center p-3">
                <img alt="pricing" src="/img/pricing/img-1.svg" height="360"/>
            </div>
        </div>
    </div>
</Card>

<div class="row gx-4 py-5">
    <div class="col-xl-6 col-md-6 py-3 py-xl-5">
        <Card class="h-100">
            <CardBody class="p-30px d-flex flex-column">
                <div class="d-flex align-items-center">
                    <div class="flex-1">
                        <div class="h6 font-monospace">Market Mover Alert</div>
                        <div class="mb-0">
                             A specialized service for day traders and short-term investors who need to react swiftly to market changes, provides real-time alerts based on sentiment analysis and predictive modeling to identify potential significant moves in the cryptocurrency market.
                        </div>
                    </div>
                    <div>
                        <Icon class="iconify display-4 text-body text-opacity-50 rounded-3"
                              icon="fluent-mdl2:market"/>
                    </div>
                </div>
                <hr class="my-20px"/>
                <div class="mb-5 text-body text-opacity-75 flex-1">
                    <div class="row">
                        <div class="col-xl-6">
                            <div class="d-flex align-items-center mb-4">
                                <Icon class="iconify fs-24px text-theme" icon="bi:bell-fill"/>
                                <div class="flex-1 ps-3">
                                    <span class="font-monospace small">Real-Time Sentiment Alerts</span>
                                </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <Icon class="iconify fs-24px text-theme" icon="bi:graph-up"/>
                                <div class="flex-1 ps-3">
                                    <span class="font-monospace small">Predictive Trade Signals</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <div class="d-flex align-items-center mb-4">
                                <Icon class="iconify fs-24px text-theme" icon="carbon:notification-new"/>
                                <div class="flex-1 ps-3">
                                    <span class="font-monospace small">Market Event Notifications</span>
                                </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <Icon class="iconify fs-24px text-theme" icon="mdi:settings"/>
                                <div class="flex-1 ps-3">
                                    <span class="font-monospace small">Customizable Alert Parameters</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="mx-n2">
                    <a href="/contact-us" class="btn btn-outline-default btn-lg w-100 font-monospace">Contact Us <i
                            class="fa fa-arrow-right"></i></a>
                </div>
            </CardBody>
        </Card>
    </div>
    <div class="col-xl-6 col-md-6 py-3 py-xl-5">
        <Card class="h-100">
            <CardBody class="p-30px d-flex flex-column">
                <div class="d-flex align-items-center">
                    <div class="flex-1">
                        <div class="h6 font-monospace">Community Insights</div>
                        <div class="mb-0">
                            Designed for marketers and community managers in the crypto space, this product offers in-depth analysis of community engagement, sentiment, and dynamics. It helps optimize marketing strategies and community management practices.
                        </div>
                    </div>
                    <div>
                        <Icon class="iconify display-4 text-body text-opacity-50 rounded-3"
                              icon="fluent:people-community-16-regular"/>
                    </div>
                </div>
                <hr class="my-20px"/>
                <div class="mb-5 text-body text-opacity-75 flex-1">
                    <div class="row">
                        <div class="col-xl-6">
                            <div class="d-flex align-items-center mb-4">
                                <Icon class="iconify fs-24px text-theme" icon="streamline:trending-content"/>
                                <div class="flex-1 ps-3">
                                    <span class="font-monospace small">Trending Topics Identification</span>
                                </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <Icon class="iconify fs-24px text-theme" icon="material-symbols:spatial-tracking-outline"/>
                                <div class="flex-1 ps-3">
                                    <span class="font-monospace small">Influencer Tracking</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <div class="d-flex align-items-center mb-4">
                                <Icon class="iconify fs-24px text-theme" icon="carbon:cics-region"/>
                                <div class="flex-1 ps-3">
                                    <span class="font-monospace small">Cultural and Regional Insights</span>
                                </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <Icon class="iconify fs-24px text-theme" icon="humbleicons:activity"/>
                                <div class="flex-1 ps-3">
                                    <span class="font-monospace small">Engagement and Activity Reports</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="mx-n2">
                    <a href="/contact-us" class="btn btn-outline-default btn-lg w-100 font-monospace">Contact Us <i
                            class="fa fa-arrow-right"></i></a>
                </div>
            </CardBody>
        </Card>
    </div>
    <div class="col-xl-6 col-md-6 py-3 py-xl-5">
        <Card class="h-100">
            <CardBody class="p-30px d-flex flex-column">
                <div class="d-flex align-items-center">
                    <div class="flex-1">
                        <div class="h6 font-monospace">Strategic Advisory</div>
                        <div class="mb-0">
                            A consultancy service aimed at institutional investors and large-scale cryptocurrency firms seeking to navigate the complex market landscape. This service uses data-driven insights from Trixy to offer strategic advice tailored to the specific business goals and market conditions.
                        </div>
                    </div>
                    <div>
                        <Icon class="iconify display-4 text-body text-opacity-50 rounded-3"
                              icon="ph:strategy-duotone"/>
                    </div>
                </div>
                <hr class="my-20px"/>
                <div class="mb-5 text-body text-opacity-75 flex-1">
                    <div class="row">
                        <div class="col-xl-6">
                            <div class="d-flex align-items-center mb-4">
                                <Icon class="iconify fs-24px text-theme" icon="ep:data-analysis"/>
                                <div class="flex-1 ps-3">
                                    <span class="font-monospace small">Custom Market Analysis</span>
                                </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <Icon class="iconify fs-24px text-theme" icon="carbon:ibm-cloud-security-compliance-center-workload-protection"/>
                                <div class="flex-1 ps-3">
                                    <span class="font-monospace small">Regulatory Compliance Guidance</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <div class="d-flex align-items-center mb-4">
                                <Icon class="iconify fs-24px text-theme" icon="ph:strategy-fill"/>
                                <div class="flex-1 ps-3">
                                    <span class="font-monospace small">Investment & Trading Strategies</span>
                                </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <Icon class="iconify fs-24px text-theme" icon="mage:chart-25"/>
                                <div class="flex-1 ps-3">
                                    <span class="font-monospace small">Quarterly Market Outlooks</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="mx-n2">
                    <a href="/contact-us" class="btn btn-outline-default btn-lg w-100 font-monospace">Contact Us <i
                            class="fa fa-arrow-right"></i></a>
                </div>
            </CardBody>
        </Card>
    </div>
    <div class="col-xl-6 col-md-6 py-3 py-xl-5">
        <Card class="h-100">
            <CardBody class="p-30px d-flex flex-column">
                <div class="d-flex align-items-center">
                    <div class="flex-1">
                        <div class="h6 font-monospace">Enterprise API</div>
                        <div class="mb-0">
                            This product offers developers and businesses access to Trixy's powerful real-time analytics engine via an API. Ideal for creating custom applications that require live cryptocurrency market data and sentiment analysis.</div>
                    </div>
                    <div>
                        <Icon class="iconify display-4 text-body text-opacity-50 rounded-3"
                              icon="carbon:network-enterprise"/>
                    </div>
                </div>
                <hr class="my-20px"/>
                <div class="mb-5 text-body text-opacity-75 flex-1">
                    <div class="row">
                        <div class="col-xl-6">
                            <div class="d-flex align-items-center mb-4">
                                <Icon class="iconify fs-24px text-theme" icon="wpf:online"/>
                                <div class="flex-1 ps-3">
                                    <span class="font-monospace small">Real-Time Data Access</span>
                                </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <Icon class="iconify fs-24px text-theme" icon="wpf:online"/>
                                <div class="flex-1 ps-3">
                                    <span class="font-monospace small">Scalable API Calls</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <div class="d-flex align-items-center mb-4">
                                <Icon class="iconify fs-24px text-theme" icon="bx:support"/>
                                <div class="flex-1 ps-3">
                                    <span class="font-monospace small">Dedicated Support</span>
                                </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <Icon class="iconify fs-24px text-theme" icon="ic:sharp-security"/>
                                <div class="flex-1 ps-3">
                                    <span class="font-monospace small">Security and Reliability</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="mx-n2">
                    <a href="/contact-us" class="btn btn-outline-default btn-lg w-100 font-monospace">Contact Us <i
                            class="fa fa-arrow-right"></i></a>
                </div>
            </CardBody>
        </Card>
    </div>

</div>
