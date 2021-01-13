<template>
  <section class="section" style="margin-bottom: 200px">
    <h2 class="title is-4 has-text-grey">
      API
    </h2>
   
    <p>
        Laporan Keuangan yang ada di dataku dapat diakses langsung melalui API berikut: <br/>
        <table class="table">
            <thead>
                <th>Deskripsi</th>
                <th>URL</th>
                <th>Method</th>
                <th>Parameter</th>
            </thead>
            <tbody>
                <tr>
                    <td>Daftar Entitas</td>
                    <td>http://jendelakeu.vercel.app/reports/index.json</td>
                    <td>GET</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>Laporan XBRL</td>
                    <td>http://jendelakeu.vercel.app/reports/{kodeEntitas}?tahun={tahun}</td>
                    <td>GET</td>
                    <td>kodeEntitas adalah kode 4 (empat) angka sesuai dengan <a href="https://www.kemendagri.go.id/files/2019-05/Kode&Data%20Wilayah/Permendagri%20137-2017.pdf">Permendagri 137 Tahun 2017</a><br/>
                        tentang Kode Dan Data Wilayah Administrasi Pemerintahan.
                        tahun adalah tahun pelaporan<br/>
                    </td>
                </tr>
            </tbody>
        </table>
    </p>
  </section>
</template>
