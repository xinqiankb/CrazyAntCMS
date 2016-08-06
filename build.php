<?php

return [  
    // 生成运行时目录  
    '__dir__'  => ['runtime/cache', 'runtime/log', 'runtime/temp', 'runtime/template'],  
    '__file__' => ['common.php'],  
  
    // 定义index模块的自动生成  
    'index'    => [  
        '__file__'   => ['common.php'],  
        '__dir__'    => ['behavior', 'controller', 'model', 'view'],  
        'controller' => ['Index', 'Test', 'UserType'],  
        'model'      => [],  
        'view'       => ['index/index'],  
    ],
      
    // 。。。 其他更多的模块定义  
    'admin'    => [  
        '__file__'   => ['common.php'],  
        '__dir__'    => ['behavior', 'controller', 'model', 'view'],  
        'controller' => ['Admin', 'Test', 'UserType'],  
        'model'      => [],  
        'view'       => ['admin/index'],  
    ],  
];  