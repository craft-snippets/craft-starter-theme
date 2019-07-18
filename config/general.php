<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

return [
    // Global settings
    '*' => [
        // Default Week Start Day (0 = Sunday, 1 = Monday...)
        'defaultWeekStartDay' => 1,

        // Whether generated URLs should omit "index.php"
        'omitScriptNameInUrls' => true,

        // Control Panel trigger word
        'cpTrigger' => 'admin',

        // The secure key Craft will use for hashing and encrypting data
        'securityKey' => getenv('SECURITY_KEY'),

        // Whether to save the project config out to config/project.yaml
        // (see https://docs.craftcms.com/v3/project-config.html)
        'useProjectConfigFile' => false,

        // https://docs.craftcms.com/api/v3/craft-config-generalconfig.html#errortemplateprefix
        'errorTemplatePrefix' => '_',

        // https://docs.craftcms.com/api/v3/craft-config-generalconfig.html#devmode
        'devMode' => true,

        'theme' => [
            // 'color' => '#000000'
        ],
        
    ],
];
