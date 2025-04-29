import React, { useRef, useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';

const Header = () => {
  const menuRef = useRef(null);
  const [underlineStyle, setUnderlineStyle] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [submenuVisible, setSubmenuVisible] = useState(false);

  const menuItems = [
    { label: 'ĐGNL HN', children: [] },
    { label: 'ĐGNL HCM', children: ['Lớp 12', 'Lớp 11', 'Lớp 10'] },
    { label: 'ĐGTD Bách Khoa', children: [] },
    { label: 'Kỳ thi khác', children: ['ĐGNL SP Hà Nội', 'ĐGNL SP HCM', 'ĐGNL Bộ Công an', 'ĐGNL Quân đội', 'ĐGNL V-SAT'] },
    { label: 'Học phí', children: [] },
  ];

  const handleMouseEnterTab = (e, index) => {
    const menuLeft = menuRef.current.getBoundingClientRect().left;
    const { left, width } = e.target.getBoundingClientRect();
    setUnderlineStyle({
      left: left - menuLeft,
      width: width,
      opacity: 1,
    });
    setHoveredIndex(index);
    setSubmenuVisible(true);
  };

  const handleMouseLeaveAll = () => {
    setUnderlineStyle({ ...underlineStyle, opacity: 0 });
    setHoveredIndex(null);
    setSubmenuVisible(false);
  };

  return (
    <Box sx={{ position: 'relative', zIndex: 10 }}>
      {/* Gray Overlay */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          opacity: submenuVisible ? 1 : 0,
          pointerEvents: submenuVisible ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
          zIndex: 5,
        }}
        onMouseMove={handleMouseLeaveAll}
      />

      {/* Full Navbar Area */}
      <Box
        onMouseLeave={handleMouseLeaveAll}
        sx={{
          position: 'relative',
          backgroundColor: 'white',
          zIndex: 10,
        }}
      >
        {/* Tabs */}
        <Tabs
          ref={menuRef}
          value={false}
          slotProps={{
            indicator: {
              style: {
                transition: 'all 0.3s ease',
                height: '3px',
                backgroundColor: 'blue',
                left: underlineStyle.left || 0,
                width: underlineStyle.width || 0,
                opacity: underlineStyle.opacity || 0,
              }
            }
          }}
          sx={{
            display: 'flex',
            minHeight: '48px',
          }}
        >
          {menuItems.map((item, index) => (
            <Tab
              key={index}
              label={item.label}
              disableRipple
              onMouseEnter={(e) => handleMouseEnterTab(e, index)}
              sx={{
                fontSize: '16px',
                color: 'black',
                minWidth: 'unset',
                padding: '10px 20px',
                textTransform: 'none',
                position: 'relative',
              }}
            />
          ))}
        </Tabs>

        {/* SubMenu */}
        <Box
          sx={{
            position: 'absolute',
            top: '100%',
            left: underlineStyle.left || 0,        // 💥 Position it under hovered tab
            width: 'auto',  // 💥 Match the tab width
            overflow: 'hidden',
            maxHeight: submenuVisible && hoveredIndex !== null && menuItems[hoveredIndex].children.length > 0 ? '300px' : '0px',
            transition: 'max-height 0.4s ease, opacity 0.4s ease',
            opacity: submenuVisible && hoveredIndex !== null && menuItems[hoveredIndex].children.length > 0 ? 1 : 0,
            backgroundColor: 'white',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            zIndex: 15,
          }}
        >
          {/* Only show if there are children */}
          {hoveredIndex !== null && menuItems[hoveredIndex].children.length > 0 && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: '10px',
                padding: '16px',
              }}
            >
              {menuItems[hoveredIndex].children.map((child, idx) => (
                <Box
                  key={idx}
                  sx={{
                    padding: '8px',
                    fontSize: '14px',
                    color: '#333',
                    cursor: 'pointer',
                    textAlign: 'center',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: 'blue',
                      color: 'white'
                    },
                    transition: 'all 0.3s ease',

                  }}
                >
                  {child}
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
