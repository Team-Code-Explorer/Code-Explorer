function toggleCode(codeId) {
        var codeBlock = document.getElementById(codeId);
        var toggleButton = document.querySelector(`[onclick="toggleCode('${codeId}')"] i`);

        if (codeBlock.style.display === 'none' || codeBlock.style.display === '') {
            codeBlock.style.display = 'block';
            toggleButton.classList.remove('fa-chevron-down');
            toggleButton.classList.add('fa-chevron-up');
        } else {
            codeBlock.style.display = 'none';
            toggleButton.classList.remove('fa-chevron-up');
            toggleButton.classList.add('fa-chevron-down');
        }
    }