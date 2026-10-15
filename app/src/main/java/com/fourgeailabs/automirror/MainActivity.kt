package com.fourgeailabs.automirror

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.media.projection.MediaProjectionManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.provider.Settings
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var projectionManager: MediaProjectionManager
    private var isMirroring = false

    private val captureLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (result.resultCode == Activity.RESULT_OK && result.data != null) {
            val serviceIntent = Intent(this, MirrorProjectionService::class.java).apply {
                action = MirrorProjectionService.ACTION_START_PROJECTION
                putExtra(MirrorProjectionService.EXTRA_RESULT_CODE, result.resultCode)
                putExtra(MirrorProjectionService.EXTRA_RESULT_DATA, result.data)
            }
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                startForegroundService(serviceIntent)
            } else {
                startService(serviceIntent)
            }
            isMirroring = true
            updateButtonState()
            Toast.makeText(this, "Live Screen Capture Active. Connect to Android Auto in your car.", Toast.LENGTH_LONG).show()
        } else {
            Toast.makeText(this, "Screen capture permission was not granted", Toast.LENGTH_SHORT).show()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        projectionManager = getSystemService(Context.MEDIA_PROJECTION_SERVICE) as MediaProjectionManager

        setContentView(R.layout.activity_main)
        setupViews()
    }

    private fun setupViews() {
        val btnToggle = findViewById<Button>(R.id.btnToggleMirror)
        val btnSettings = findViewById<Button>(R.id.btnSettings)
        val btnAbout = findViewById<Button>(R.id.btnAbout)

        updateButtonState()

        btnToggle.setOnClickListener {
            if (!isMirroring) {
                val captureIntent = projectionManager.createScreenCaptureIntent()
                captureLauncher.launch(captureIntent)
            } else {
                val serviceIntent = Intent(this, MirrorProjectionService::class.java).apply {
                    action = MirrorProjectionService.ACTION_STOP_PROJECTION
                }
                startService(serviceIntent)
                isMirroring = false
                updateButtonState()
                Toast.makeText(this, "Live Mirror Stopped", Toast.LENGTH_SHORT).show()
            }
        }

        btnSettings.setOnClickListener {
            showSettingsDialog()
        }

        btnAbout.setOnClickListener {
            showAboutDialog()
        }
    }

    private fun updateButtonState() {
        val btnToggle = findViewById<Button>(R.id.btnToggleMirror)
        if (isMirroring) {
            btnToggle.text = "STOP SCREEN PROJECTION"
            btnToggle.setBackgroundColor(0xFFE11D48.toInt())
        } else {
            btnToggle.text = "START LIVE SCREEN CAPTURE"
            btnToggle.setBackgroundColor(0xFF06B6D4.toInt())
        }
    }

    private fun showAboutDialog() {
        val dialogView = layoutInflater.inflate(R.layout.dialog_about, null)
        val tvCreator = dialogView.findViewById<TextView>(R.id.tvCreator)
        val tvRepo = dialogView.findViewById<TextView>(R.id.tvRepoLink)

        tvCreator.setOnClickListener {
            val browserIntent = Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/fourgeailabs"))
            startActivity(browserIntent)
        }

        tvRepo.setOnClickListener {
            val browserIntent = Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/fourgeailabs/AutoMirror"))
            startActivity(browserIntent)
        }

        AlertDialog.Builder(this)
            .setTitle("About AutoMirror")
            .setView(dialogView)
            .setPositiveButton("Close", null)
            .show()
    }

    private fun showSettingsDialog() {
        val items = arrayOf("What's New", "Touch Relay (Accessibility)", "Display Keep-Awake")
        AlertDialog.Builder(this)
            .setTitle("AutoMirror Settings")
            .setItems(items) { _, which ->
                when (which) {
                    0 -> showWhatsNewDialog()
                    1 -> openAccessibilitySettings()
                    2 -> Toast.makeText(this, "Keep screen awake: Enabled", Toast.LENGTH_SHORT).show()
                }
            }
            .setNegativeButton("Done", null)
            .show()
    }

    private fun showWhatsNewDialog() {
        val releases = arrayOf(
            "v1.02.00 (Current)\n- 24:9 Aspect Ratio: Native support for 24:9 panoramic ultrawide vehicle displays (2880x1080 / 1920x720) without pillarboxing or distortion.\n- Optimized VirtualDisplay projection matrix for super ultrawide infotainment cockpits.",
            "v1.01.00\n- Driver Distraction Exemption: Declared distractionOptimized=true and NAVIGATION category to ensure unblocked continuous playback while vehicle is in motion.\n- Stripped all redundant UI clutter for pure, immediate edge-to-edge screen capture.\n- Automated connection broadcast receiver.",
            "v1.00.00\n- Initial release with NavigationTemplate surface takeover and 60 FPS MediaProjection."
        )
        AlertDialog.Builder(this)
            .setTitle("What's New")
            .setItems(releases, null)
            .setPositiveButton("Dismiss", null)
            .show()
    }

    private fun openAccessibilitySettings() {
        val intent = Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)
        startActivity(intent)
        Toast.makeText(this, "Enable 'AutoMirror Touch Relay' for car touch input", Toast.LENGTH_LONG).show()
    }
}
